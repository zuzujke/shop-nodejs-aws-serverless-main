'use strict';

module.exports.basicAuthorizer = async (event) => {
  const authorizationToken = event.authorizationToken;

  if (!authorizationToken) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Authorization header is not provided' }),
    };
  }

  const encodedCredentials = authorizationToken.split(' ')[1];
  const buff = Buffer.from(encodedCredentials, 'base64');
  const plainCredentials = buff.toString('utf-8').split(':');
  const [username, password] = plainCredentials;

  const expectedPassword = process.env.GITHUB_ACCOUNT;

  if (username === process.env.GITHUB_ACCOUNT && password === expectedPassword) {
    return generatePolicy(username, 'Allow', event.methodArn);
  } else {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: 'Access denied (invalid authorization_token)' }),
    };
  }
};

const generatePolicy = (principalId, effect, resource) => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource,
        },
      ],
    },
  };
};
