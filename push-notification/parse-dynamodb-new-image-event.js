'use strict';
module.exports = function parseDynamoDBNewImageEvent(event) {
	const extractDynamoDb = record => record.dynamodb && record.dynamodb.NewImage,
		extractDynamoDBItem = newImage => {
			const cleanObject = {};
			Object.keys(newImage).forEach(propName => {
				cleanObject[propName] = Object.values(newImage[propName])[0];
			});
			return cleanObject;
		};
	if (!event || !event.Records || !Array.isArray(event.Records)) {
		return [];
	}
	return event.Records.map(extractDynamoDb).filter(x => x).map(extractDynamoDBItem);
};
