const AWS = require('aws-sdk');

// Add ApiGatewayManagementApi to the AWS namespace
require('aws-sdk/clients/apigatewaymanagementapi');

const dynamoDb = new AWS.DynamoDB.DocumentClient(),
  { CONNECTIONS_TABLE_NAME, STAGE_NAME, DOMAIN_NAME } = process.env;


exports.handler = (event, context) => {
  console.log('hello from the PUSH NOTIFicATION?');
  console.log(event);

  return dynamoDb.scan({ TableName: CONNECTIONS_TABLE_NAME, ProjectionExpression: 'connectionId' }).promise()
    .then(result => {
      let connectionData = result;
      console.log(result);

      const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: DOMAIN_NAME + '/' + STAGE_NAME
      });

      console.log('EVENT BODy');
      console.log(event.body);

      const postData = JSON.parse(event.body).data;

      console.log(postData);

      const postCalls = connectionData.Items.map(({ connectionId }) => {
        console.log('connection ID');
        console.log(connectionId);
        return apigwManagementApi.postToConnection({ ConnectionId: connectionId, Data: postData }).promise()
          .catch(errorPosting => {
            if (errorPosting.statusCode === 410) {
              console.log(`Found stale connection, deleting ${connectionId}`);
             return dynamoDb.delete({ TableName: CONNECTIONS_TABLE_NAME, Key: { connectionId } }).promise();
            } else {
              throw errorPosting;
            }
          });
      });
      return Promise.all(postCalls);
    }).then(responses => {
      console.log('SUCCESS');
      return processResponse(200, 'Data sent');
    }).catch(err => {
      console.log(err);
      return processResponse(500, err.stack);
    });
};

function processResponse(statusCode, data) {
  return { statusCode, body: JSON.stringify(data) };
}