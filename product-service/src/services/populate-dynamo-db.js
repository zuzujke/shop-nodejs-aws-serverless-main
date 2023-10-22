const AWS = require('aws-sdk');

const awsConfig = {
    region: 'eu-west-1',
    profile: 'default',
};

AWS.config.update(awsConfig);

const docClient = new AWS.DynamoDB.DocumentClient();

const products = [
    {
        description: "Updated anniversary edition of the legendary book \"Design Patterns\". Many programming problems tend to be repetitive and duplicative. Developers around the world are solving completely identical problems and finding similar solutions. If you don't want to reinvent the wheel, use the ready-made design patterns that this book is about to work with.",
        id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
        price: 15,
        title: "Head First. Design patterns. Eric Freeman, Elizabeth Freeman",
    },
    {
        description: "Can you easily change the code and get immediate feedback on the changes you make? How clear is this code? If you come across legacy code, Michael K. Feathers's book on working with it comes in handy.\n\nIn the book Effectively Working with Legacy Code, you will find information about mechanisms for making changes to software, porting legacy code to testing tools, writing tests that prevent new errors from being introduced into the code, and applying methods suitable for any language or platform. sample code in Java, C ++, C, and C #. In addition, you will learn how to pinpoint where changes need to be made in your code, how to work with legacy code that is not object-oriented, and much more.",
        id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
        price: 23,
        title: "Effective work with legacy code. Michael K. Feathers",
    },
    {
        description: "This publication is a collection of useful tips, many of which can only be formulated on our own experience after many years of work in the industry. There is no description of specific technologies, algorithms and programming languages - this is not the value of the Fanatic Programmer. The book will tell you how to overcome lack of motivation, choose the right priorities, understand the psychology of programming, build relationships with management and colleagues, etc.",
        id: "7567ec4b-b10c-45c5-9345-fc73c48a80a3",
        price: 15,
        title: "Fanatic programmer. Chad Fowler",
    },
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
