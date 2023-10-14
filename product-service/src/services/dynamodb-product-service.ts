import { ProductServiceInterface, ProductInterface, StockInterface } from './products';
import AWS from 'aws-sdk';

export default class DynamodbProductService implements ProductServiceInterface {
  private tableName = 'products';
  private stockTableName = 'stocks';
  private dynamoDBClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    this.dynamoDBClient = new AWS.DynamoDB.DocumentClient();
  }

  async getProductById(id: string): Promise<ProductInterface | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        id,
      },
    };

    try {
      const result = await this.dynamoDBClient.get(params).promise();
      return result.Item as ProductInterface | null;
    } catch (error) {
      console.error('Error getting product from DynamoDB:', error);
      return null;
    }
  }

  async getAllProducts(): Promise<ProductInterface[]> {
    const params = {
      TableName: this.tableName,
    };

    try {
      const result = await this.dynamoDBClient.scan(params).promise();
      return result.Items as ProductInterface[];
    } catch (error) {
      console.error('Error scanning products from DynamoDB:', error);
      return [];
    }
  }

  async getStockByProductId(productId: string): Promise<StockInterface | null> {
    const params = {
      TableName: this.stockTableName,
      Key: {
        product_id: productId,
      },
    };

    try {
      const result = await this.dynamoDBClient.get(params).promise();

      if (result.Item) {
        return result.Item as StockInterface;
      }

      return null;
    } catch (error) {
      console.error('Error retrieving stock data:', error);
      return null;
    }
  }

  async create(product: Pick<ProductInterface, 'id' | 'title' | 'description' | 'price' | 'logo'>): Promise<ProductInterface | null> {
    const params = {
      TableName: this.tableName,
      Item: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        logo: product.logo,
      },
    };

    try {
      await this.dynamoDBClient.put(params).promise();
      return product as ProductInterface;
    } catch (error) {
      console.error('Error creating product in DynamoDB:', error);
      return null;
    }
  }
}
