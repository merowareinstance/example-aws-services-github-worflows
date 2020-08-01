const { aws } = require("../modules");

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
  } catch (error) {
    console.error(e);
  }

  return result || null;
}

async function getTreeLocationFromS3(id) {
  let data;

  try {
    data = await s3Client
      .getObject({
        Bucket: "trees",
        Key: `tree${id}Location.txt`,
      })
      .promise();
  } catch (e) {
    console.error(e);
  }
  return data || null;
}

async function readMessageFromSQS() {
  let data;

  try {
    data = await sqsClient
      .receiveMessage({
        QueueUrl: "http://localhost" /* required */,
        MaxNumberOfMessages: 1,
      })
      .promise();
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
