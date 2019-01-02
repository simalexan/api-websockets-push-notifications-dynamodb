
# Api Gateway (Websockets) Push Notifications -> DynamoDB

## Description

This is a serverless component consisting of:

- an API Gateway with Websockets, that handles connections with clients
- On Connect Lambda function, that's invoked when a client connects and stores that to
- a `Connections` DynamoDB table, where all of our client connections are stored
- On Disconnect Lambda function, that's invoked when a client disconnects and delets that connection from the Connections DynamoDB table
- Push Notifications Lambda function, that's pushing a notification to all of the clients invoked when an Notification Event is stored into
- a `NotificationEvents` DynamoDB table, in which you can store events that are happening throughout your application and they will be pushed as notifications towards the application users

_Aside from this main functionality, its important features are:_

- Supports CORS
- Written in Node.js
- Easily composable into your other app components by adding triggers to its DynamoDB table

It's a Nuts & Bolts application component for AWS Serverless Application Repository.

## Latest Release - 1.0.0

Initial release.

## Roadmap - Upcoming changes

Here are the upcoming changes that I'll add to this serverless component:

- ESLint
- Tests
