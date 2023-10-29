import { winstonLogger } from "./utils/winstonLogger";

const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamodb = new AWS.DynamoDB.DocumentClient();

export const catalogBatchProcessHandler = () => async (event) => {
  try {
    for (const record of event.Records) {
      const message = JSON.parse(record.body);

      await createProductInDynamoDB(message);

      winstonLogger.logRequest(`Product created: ${message}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify('Products created successfully'),
    };
  } catch (error) {
    winstonLogger.logError(`Error processing SQS event: ${error}`);
    throw error;
  }
};

async function createProductInDynamoDB(productData) {
  const params = {
    TableName: 'products',
    Item: {
      id: uuidv4(),
      title: productData.title,
      description: productData.description,
      price: productData.price,
      count: productData.count,
    },
  };

  await dynamodb.put(params).promise();
}
