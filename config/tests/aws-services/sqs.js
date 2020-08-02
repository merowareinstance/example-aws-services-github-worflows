const { aws } = require("../../../src/modules");

async function createQueue(name) {
  return aws.sqsClient
    .createQueue({
      QueueName: name,
    })
    .promise();
}

async function deleteQueue(url) {
  return aws.sqsClient
    .deleteQueue({
      QueueUrl: url,
    })
    .promise();
}

module.exports = {
  createQueue,
  deleteQueue,
};
