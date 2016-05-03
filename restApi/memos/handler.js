'use strict';

module.exports.handler = function(event, context, cb) {
  return cb(null, {
    message: 'Go Serverless! Your Lambda function executed successfully!',
    apig: event.apig,
    title: event.title,
    body: event.body
  });
};
