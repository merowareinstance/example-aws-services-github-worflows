const { aws, config } = require("../modules");

const { dynamoClient, sqsClient, s3Client } = aws;

async function getTreesByType(type) {
  let result;
  try {
    const params = {
      Key: {
        type: { S: type },
      },
      TableName: "Trees",
    };
    result = await dynamoClient.getItem(params).promise();
    return result || null;
  } catch (e) {
    console.error(e);
  }

  return result || null;
}

async function getTreeLocationFromS3(objectKey) {
  let data;
  try {
    data = await s3Client
      .getObject({
        Bucket: config.get("aws.s3.bucketName"),
        Key: objectKey,
      })
      .promise();
  } catch (e) {
    console.error("Error during get object service", e);
  }
  return data && data.Body ? JSON.parse(data.Body.toString()) : null;
}

async function readMessageFromSQS() {
  let data;

  try {
    data = await sqsClient
      .receiveMessage({
        QueueUrl: config.get("aws.sqs.queueUrl"),
        MaxNumberOfMessages: 1,
      })
      .promise();
    console.log(data);
  } catch (e) {
    console.error(e);
  }

  return data ? JSON.parse(data) : null;
}

module.exports = {
  getTreesByType,
  getTreeLocationFromS3,
  readMessageFromSQS,
};
