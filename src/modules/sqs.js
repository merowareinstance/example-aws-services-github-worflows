const aws = require("./aws");
const config = require("./config");

const { sqsClient } = aws;

async function readMessage() {
  let data;

  try {
    data = await sqsClient
      .receiveMessage({
        QueueUrl: config.get("aws.sqs.queueUrl"),
        MaxNumberOfMessages: 1,
      })
      .promise();

    if (!data || !data.Messages || !data.Messages.length) {
      return null;
    }

    [data] = data.Messages;

    data = data && data.Body ? JSON.parse(data.Body) : null;
  } catch (e) {
    console.log(new Error("Could not read message from sqs", e));
  }

  return data;
}

module.exports = {
  readMessage,
};
