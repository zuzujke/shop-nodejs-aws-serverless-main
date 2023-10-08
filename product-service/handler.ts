import * as handlers from './src';
// import { Client } from 'pg';
// import PostgresProductService from './src/services/postgres-memory-product-service';
import InMemoryProductService from './src/services/in-memory-product-service';

// const databaseClient = new Client();

// TODO in further tasks
// databaseClient.connect()
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to the database:', err);
//     process.exit(1);
//   });
// const productService = new PostgresProductService(databaseClient);

const mockProductService = new InMemoryProductService();

export const getProductById = handlers.getProductByIdHandler(mockProductService);
export const getAllProducts = handlers.getAllProductsHandler(mockProductService);
// TODO: in further tasks
// export const createProduct = handlers.createProductHandler(productService);
