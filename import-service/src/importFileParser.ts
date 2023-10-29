import csv from 'csv-parser';
import AWS from 'aws-sdk';

const BUCKET = process.env.BUCKET;
const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

const s3 = new AWS.S3();
const sqs = new AWS.SQS();

export const importFileParser = async (event) => {
  const promises = event.Records.map(async (record) => {
    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      Key: record.s3.object.key,
    }).createReadStream();

    const csvRecords = [];

    s3Stream
    .pipe(csv())
    .on('data', (data) => {
      csvRecords.push(data);
    })
    .on('end', async () => {
      if (csvRecords.length > 0) {
        await sqs.sendMessage({
          QueueUrl: SQS_QUEUE_URL,
          MessageBody: JSON.stringify(csvRecords),
        }).promise();
      }

      const newKey = record.s3.object.key.replace('uploaded', 'parsed');
      await s3.copyObject({
        Bucket: BUCKET,
        CopySource: `${BUCKET}/${record.s3.object.key}`,
        Key: newKey,
      }).promise();

      await s3.deleteObject({
        Bucket: BUCKET,
        Key: record.s3.object.key,
      }).promise();
    });
  });

  await Promise.all(promises);
};
