const AWS = require('aws-sdk');

// Add ApiGatewayManagementApi to the AWS namespace
require('aws-sdk/clients/apigatewaymanagementapi');

const dynamoDb = new AWS.DynamoDB.DocumentClient(),
  processResponse = require('process-response'),
  { CONNECTIONS_TABLE_NAME, NOTIFICATIONS_TABLE_NAME } = process.env;


exports.handler = (event, context) => {
  console.log('hello from the PUSH NOTIFicATION?');
  console.log(event);

  return dynamoDb.scan({ TableName: CONNECTIONS_TABLE_NAME, ProjectionExpression: 'connectionId' }).promise()
    .then(result => {
      let connectionData = result;
      console.log(result);

      const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: event.requestContext.domainName + '/' + event.requestContext.stage
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
             return dynamoDb.delete({ TableName: TABLE_NAME, Key: { connectionId } }).promise();
            } else {
              throw errorPosting;
            }
          });
      });
      return Promise.all(postCalls);
    }).then(responses => {
      console.log('SUCCESS');
      return processResponse(true, 'Data sent.', 200);
    }).catch(err => {
      console.log(err);
      return processResponse(true, err.stack, 500);
    });
};