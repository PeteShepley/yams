const slsExpress = require('aws-serverless-express');
const app = require('./app');

async function handler(event, context) {
  const server = slsExpress.createServer(app);
  return slsExpress.proxy(server, event, context, 'PROMISE').promise;
}

module.exports.handler = handler;
