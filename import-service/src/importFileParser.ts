import csv from 'csv-parser';

export const importFileParserHandler = ({
    s3,
    logger,
}) => async (event) => {
    event.Records.forEach(record => {
      const bucketName = record.s3.bucket.name;
      const objectKey = record.s3.object.key;
        const s3Stream = s3.getObject({
            Bucket: bucketName,
            Key: objectKey
        }).createReadStream();

        s3Stream.pipe(csv())
            .on('data', (data) => {
                logger.log(data);
            })
            .on('end', async () => {
                logger.log(`Copy from ${bucketName}/${record.s3.object.key}`);

                await s3.copyObject({
                    Bucket: bucketName,
                    CopySource: `${bucketName}/${record.s3.object.key}`,
                    Key: record.s3.object.key.replace('uploaded', 'parsed')
                }).promise();

                logger.log(`Copied into ${bucketName}/${record.s3.object.key.replace('uploaded', 'parsed')}`);
            });
    });
}
