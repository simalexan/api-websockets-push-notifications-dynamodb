const AWS = require('aws-sdk'),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  processResponse = require('./process-response');

exports.handler = (event) => {
  const connection = {
    TableName: process.env.TABLE_NAME,
    Item: {
      connectionId: { S: event.requestContext.connectionId }
    }
  };

  return dynamoDb.put(connection).promise()
    .then(response => processResponse(true, {}, 201))
    .catch(error => {
      console.log(error);
      return processResponse(true, error, 400);
    });
};