import { ProductServiceInterface, ProductInterface } from './services/products';
import { winstonLogger } from './utils/winstonLogger';
import { errorResponse, successResponse } from './utils/apiResponseBuilder';

/**
 * Lambda handler for retrieving all products with associated stock data.
 *
 * @param {ProductServiceInterface} productService - An instance of the ProductService.
 * @returns {Promise} - A promise that resolves with the API response.
 */
export const getAllProductsHandler = (productService: ProductServiceInterface) => async (event, _context) => {
  try {
    winstonLogger.logRequest(`Incoming event: ${JSON.stringify(event)}`);
    const products: ProductInterface[] = await productService.getAllProducts();

    const productsWithStocks: ProductInterface[] = await Promise.all(products.map(async (product) => {
      const stock = await productService.getStockByProductId(product.id);
      return { ...product, stock };
    }));

    winstonLogger.logRequest(`Received products with stock data: ${JSON.stringify(productsWithStocks)}`);

    return successResponse(productsWithStocks);
  } catch (error) {
    winstonLogger.logError(`Error: ${error.stack}`);

    return errorResponse(error.message);
  }
};
