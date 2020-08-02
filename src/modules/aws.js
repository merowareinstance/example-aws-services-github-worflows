const aws = require("aws-sdk");
const serviceConfig = require("./config");

const awsConfig = serviceConfig.get("aws.config");
const sqsClient = new aws.SQS(awsConfig);
const s3Client = new aws.S3(awsConfig);

module.exports = {
  awsConfig,
  sqsClient,
  s3Client,
};
