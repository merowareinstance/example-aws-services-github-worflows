const { AWS_HOST: awsEnvHost } = process.env;

module.exports = {
  aws: {
    s3: {
      baseBucketName: "trees",
      bucketName: "",
    },
    sqs: {
      baseQueueName: "forest-local",
      queueUrl: "",
    },
    config: {
      endpoint: `http://${awsEnvHost || "localhost"}:4566`, // localstack now supports one endpoint entry point for all services
      region: "us-east-1",
      accessKeyId: "something", // Can be whatever we just need it as a mock
      secretAccessKey: "something", // Can be whatever we just need is as a mock
      s3ForcePathStyle: true, // S3 specific config: Required so that aws s3 can properly send port on url
    },
  },
};
