module.exports = {
  getAll: function getAll(tableName, projectionExpression) {
    return dynamoDb.scan({ TableName: tableName, ProjectionExpression: projectionExpression }).promise();
  },
  deleteItem: function deleteItem(tableName, primaryKey, primaryKeyValue) {
    const key = {};
    key[primaryKey] = primaryKeyValue;
    return dynamoDb.delete({ TableName: tableName, Key: key }).promise();
  }
}