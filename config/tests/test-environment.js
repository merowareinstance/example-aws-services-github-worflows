/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const NodeEnvironment = require("jest-environment-node");
const { config: serviceConfig, db } = require("../../src/modules");

let sqsSetup;
let s3Setup;
let dynamoDbSetup;

class DbNodeEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
    this.debug = process.env.DEBUG === "true";
  }

  async setup() {
    await super.setup();
    if (!this.debug) {
      global.console = {
        log: () => {},
        error: () => {},
        debug: () => {},
      };
    }
    const sqsBaseQueueName = serviceConfig.get("aws.sqs.baseQueueName");
    const s3BaseBucketName = serviceConfig.get("aws.s3.baseBucketName");
    ({ sqsSetup, s3Setup, dynamoDbSetup } = require("./aws-services"));
    const { JEST_WORKER_ID: jestWorkerId } = process.env;
    // SQS bucket setup
    const sqsQueueName = `${sqsBaseQueueName}_${jestWorkerId}`;
    console.log(`Setting up sqs queue ${sqsQueueName}`);
    const data = await sqsSetup.createQueue(sqsQueueName);
    console.log(`SQS QueueUrl Setup ${data.QueueUrl}`);
    serviceConfig.set("aws.sqs.queueUrl", data.QueueUrl);
    console.log(`Done setting up sqs ${sqsQueueName}`);

    // S3 bucket setup
    const s3BucketName = `${s3BaseBucketName}${jestWorkerId}`;
    console.log(`Setting up s3 bucket ${s3BucketName}`);
    await s3Setup.createBucket(s3BucketName);
    serviceConfig.set("aws.s3.bucketName", s3BucketName);
    console.log(`Done setting up s3 ${s3BucketName}`);

    // Setup DynamoDb
    await dynamoDbSetup.createTables();

    // export configs and databases for re-usability
    this.global.config = serviceConfig;
    this.global.db = db;
  }

  async teardown() {
    await sqsSetup.deleteQueue(serviceConfig.get("aws.sqs.queueUrl"));
    await s3Setup.deleteBucket(serviceConfig.get("aws.s3.bucketName"));
    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = DbNodeEnvironment;
