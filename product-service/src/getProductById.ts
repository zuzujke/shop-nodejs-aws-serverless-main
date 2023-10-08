import { ProductServiceInterface } from "./services/products";
import { winstonLogger } from "./utils/winstonLogger";
import { errorResponse, successResponse } from "./utils/apiResponseBuilder";

/**
 * Lambda handler for retrieving a product by ID.
 *
 * @param {ProductServiceInterface} productService - An instance of the ProductService.
 * @returns {Promise} - A promise that resolves with the API response.
 */
export const getProductByIdHandler = (productService: ProductServiceInterface) => async (event, _context) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);

    const { productId = '' } = event.pathParameters;

    if (!productId) {
      winstonLogger.logError("Product ID is missing or invalid.");
    }

    const product = await productService.getProductById(productId);

    if (product) {
      winstonLogger.logRequest(`Received product with id: ${productId}: ${JSON.stringify(product)}`);
      return successResponse({ product });
    }

    winstonLogger.logError("404: Product not found");
  } catch (err) {
    winstonLogger.logError(`Error: ${err.stack}`);
    return errorResponse(err);
  }
}
