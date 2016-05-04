'use strict';

var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: process.env['SERVERLESS_REGION']});
var stage = process.env['SERVERLESS_STAGE'];
var memosTableName = 'Memos-' + stage;
var anonymousUserName = 'anonymous';

module.exports.handler = function(event, context, cb) {
  //console.debug(JSON.stringify(event.apig));

  var method = event.apig.httpMethod;
  var now = new Date();

  if (method === 'POST') {
    var params = {
      TableName: memosTableName,
      Item: {
        UserId: { 'S': anonymousUserName },
        Title: { 'S': event.title },
        Body: { 'S': event.body },
        CreatedAt: { 'N': now.getTime().toString() },
        UpdatedAt: { 'N': now.getTime().toString() }
      }
    };
    dynamodb.putItem(params, function(err, data) {
      if (err) {
        console.error('Create Memo Failed:', err, err.stack);
      } else {
        console.log('Create Memo:', params.Item.UserId, params.Item.CreatedAt);
      }
      return cb(err, data);
    });
  } else if (method === 'GET') {
    var params = {
      TableName : memosTableName,
      KeyConditionExpression: '#Userid = :Userid',
      ExpressionAttributeNames:{ '#Userid': 'UserId' },
      ExpressionAttributeValues: { ':Userid': { 'S': anonymousUserName } }
    };
    dynamodb.query(params, function(err, data) {
      return cb(err, data);
    });
  } else {
    return cb(null, {
      message: 'Not supported method'
    });
  }
};
