const AWS = require('aws-sdk'),
  dynamoDb = new AWS.DynamoDB.DocumentClient(),
  processResponse = require('./process-response');

exports.handler = (event) => {
  var deleteParams = {
    TableName: process.env.TABLE_NAME,
    Key: {
      connectionId: event.requestContext.connectionId
    }
  };

  return dynamoDb.delete(deleteParams).promise()
    .then(response => processResponse(true, {}, 200))
    .catch(error => {
      console.log(error);
      return processResponse(true, error, 400);
    });
};