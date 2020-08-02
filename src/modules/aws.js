const aws = require("aws-sdk");

const serviceConfig = require("./config");

const config = serviceConfig.get("aws.config");

const awsConfig = new aws.Config(config);
// const dynamoClient = aws.DynamoDb
const sqsClient = new aws.SQS(awsConfig);
const s3Client = new aws.S3(awsConfig);

module.exports = {
  awsConfig,
  sqsClient,
  s3Client,
};
