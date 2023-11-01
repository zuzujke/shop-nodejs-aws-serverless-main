import { createProductHandler } from "./createProduct";
import { winstonLogger } from "./utils/winstonLogger";
const AWS = require("aws-sdk");

const sns = new AWS.SNS({ region: "eu-west-1" });

export const publishCreatedProductMessage = async (product) => {
  try {
    await sns
    .publish({
      Subject: "Product has been created",
      Message: JSON.stringify(product),
      TopicArn: {
        Ref: 'createProductTopic'
      },
    })
    .promise();
  } catch (error) {
    winstonLogger.logError(`Error: ${error}`);
  }
};

export const catalogBatchProcessHandler = () => async (event) => {
  try {
    for (const record of event.Record) {
      const product = JSON.parse(record.body);
      await createProductHandler(product);
      await publishCreatedProductMessage(product);
    }

    return {
      statusCode: 200,
      body: "product was successfully created!!!",
    };
  } catch (error) {
    winstonLogger.logError(`catalogBatchProcessHandler error: ${error}`);
    throw error;
  }
};
