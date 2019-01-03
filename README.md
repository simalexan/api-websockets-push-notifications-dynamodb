
# Api Gateway (Websockets) Push Notifications -> Lambda -> DynamoDB

## How to set this component up

1. Create a WebSocket Api described in [Announcing WebSocket APIs in Amazon API Gateway](https://aws.amazon.com/blogs/compute/announcing-websocket-apis-in-amazon-api-gateway)
2. Deploy this component and provide the Domain Name and the Stage of your newly created Websocket API.

## Description

This is a serverless component consisting of:

- an API Gateway with Websockets, that handles connections with clients
- On Connect Lambda function, that's invoked when a client connects and stores that to
- a `notifications-clients` DynamoDB table, where all of our client connections are stored
- On Disconnect Lambda function, that's invoked when a client disconnects and delets that connection from the Connections DynamoDB table
- Push Notifications Lambda function, that's pushing a notification to all of the clients invoked when an Notification Event is stored into
- a `notifications-events` DynamoDB table, in which you can store events that are happening throughout your application and they will be pushed as notifications towards the application users

_Aside from this main functionality, its important features are:_

- Supports CORS
- Written in Node.js
- Easily composable into your other app components by storing events into to its `notifications-events` DynamoDB table

## Latest Release - 1.0.0

Initial release.

## Roadmap - Upcoming changes

Here are the upcoming changes that I'll add to this serverless component:

- ESLint
- Tests
