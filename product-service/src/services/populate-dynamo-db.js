const AWS = require('aws-sdk');

const awsConfig = {
    region: 'eu-west-1',
    profile: 'default',
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const products = [
  {
    id: '1',
    title: 'Product 1',
    description: 'Description for Product 1',
    price: 100,
  },
  {
    id: '2',
    title: 'Product 2',
    description: 'Description for Product 2',
    price: 200,
  },
];

const stocks = [
  {
    product_id: '1',
    count: 50,
  },
  {
    product_id: '2',
    count: 75,
  },
];

function addProducts() {
  products.forEach((product) => {
    const params = {
      TableName: 'products',
      Item: product,
    };

    docClient.put(params, (err) => {
      if (err) {
        console.error('Error adding product:', err);
      } else {
        console.log('Added product:', product);
      }
    });
  });
}

function addStocks() {
  stocks.forEach((stock) => {
    const params = {
      TableName: 'stocks',
      Item: stock,
    };

    docClient.put(params, (err) => {
      if (err) {
        console.error('Error adding stock:', err);
      } else {
        console.log('Added stock:', stock);
      }
    });
  });
}

addProducts();
addStocks();
