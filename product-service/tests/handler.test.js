const { expect } = require('chai');
const { getAllProductsHandler } = require('../src/getAllProducts');
const { getProductByIdHandler } = require('../src/getProductById');
const { InMemoryProductService } = require('../src/services/in-memory-product-service');

describe('Lambda Handlers', () => {
    describe('getAllProductsHandler', () => {
        it('should return an array of products', async () => {
            const productService = new InMemoryProductService();
            const event = {};

            const response = await getAllProductsHandler(productService)(event);

            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('array');
        });
    });

    describe('getProductByIdHandler', () => {
        it('should return a product by ID', async () => {
            const productService = new InMemoryProductService();
            const productId = 'yourProductId'; // Replace with a valid product ID
            const event = { pathParameters: { productId } };

            const response = await getProductByIdHandler(productService)(event);

            expect(response.statusCode).to.equal(200);
            expect(response.body).to.be.an('object');
        });

        it('should return "Product not found" for an invalid product ID', async () => {
            const productService = new InMemoryProductService();
            const productId = 'nonExistentId';
            const event = { pathParameters: { productId } };

            const response = await getProductByIdHandler(productService)(event);

            expect(response.statusCode).to.equal(404);
            expect(response.body).to.deep.equal({ message: 'Product not found' });
        });
    });
});
