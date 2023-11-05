const BUCKET = process.env.BUCKET;
import { errorResponse, successResponse } from "./utils/apiResponseBuilder";

export const importProductsFileHandler = ({
    s3,
}) => async (event) => {
  try {
    const catalogName = event.queryStringParameters.name;
    const catalogPath = `uploaded/${catalogName}`;

    if (!catalogName) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Missing or invalid "name" query parameter' }),
      };
    }

    const params = {
      Bucket: BUCKET,
      Key: catalogPath,
      Expires: 60,
      ContentType: 'text/csv'
    };

    const url = await s3.getSignedUrlPromise('putObject', params)

    return successResponse(url);
  } catch (error) {
    errorResponse(error);
  }
}
