const { DynamoDB, S3 } = require("aws-sdk");

class AWS {
  constructor() {
    const config = {
      endpoint: "http://127.0.0.1:4566", // Make configurable for test dev/test envs and remove
      // if connecting to aws rather than local stack
      region: "us-east-1",
    };

    this.dynamoClient = new DynamoDB(config);

    this.sqsClient = new DynamoDB(config);

    this.s3Client = new S3(config);
  }
}

module.exports = new AWS();
