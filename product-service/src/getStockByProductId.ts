import { ProductServiceInterface } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse } from "./utils/apiResponseBuilder";

/**
 * Lambda handler for retrieving stock data by product ID.
 *
 * @param {ProductServiceInterface} productService - An instance of the ProductService.
 * @returns {Promise} - A promise that resolves with the API response.
 */
export const getStockByProductIdHandler = (productService: ProductServiceInterface) => async (event, _context) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

    const { productId = '' } = event.pathParameters;

    if (!productId) {
      winstonLogger.logError("Product ID is missing or invalid.");
    }

    const stock = await productService.getStockByProductId(productId);

    if (stock) {
      winstonLogger.logRequest(`Received stock data for product with ID ${productId}: ${JSON.stringify(stock)}`);
      return successResponse({ stock });
    }

    winstonLogger.logError(`404: Stock data not found for product with ID ${productId}`);
  } catch (error) {
    winstonLogger.logError(`Error: ${error.stack}`);
    return errorResponse(error);
  }
}
