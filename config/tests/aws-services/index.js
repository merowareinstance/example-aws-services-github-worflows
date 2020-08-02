const sqsSetup = require("./sqs");
const s3Setup = require("./s3");
const dynamoDbSetup = require("./dynamodb");

module.exports = {
  sqsSetup,
  s3Setup,
  dynamoDbSetup,
};
