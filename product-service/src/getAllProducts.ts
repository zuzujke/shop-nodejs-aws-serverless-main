import { ProductServiceInterface } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse } from "./utils/apiResponseBuilder";

/**
 * Lambda handler for retrieving all products.
 *
 * @param {ProductServiceInterface} productService - An instance of the ProductService.
 * @returns {Promise} - A promise that resolves with the API response.
 */
export const getAllProductsHandler = (productService: ProductServiceInterface) => async (event, _context) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

    const products = await productService.getAllProducts();

    winstonLogger.logRequest(`Received products: ${JSON.stringify(products)}`);

    return successResponse(products);
  } catch (error) {
    winstonLogger.logError(`Error: ${error.stack}`);
    return errorResponse(error);
  }
}
