const AWS = require('aws-sdk'),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  processResponse = require('./process-response');

exports.handler = (event) => {
  var deleteParams = {
    TableName: process.env.TABLE_NAME,
    Key: {
      connectionId: { S: event.requestContext.connectionId }
    }
  };

  key[PRIMARY_KEY] = requestedItemId;

  dynamoDb.delete(deleteParams).promise()
    .then(response => processResponse(true, {}, 200))
    .catch(error => {
      return processResponse(true, error, 400);
    });
};