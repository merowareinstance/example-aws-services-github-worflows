const aws = require("../aws");
const config = require("../config");
const { readMessage } = require("../sqs");

describe("SQS Module Integration Test", () => {
  describe("readMessageFromSQS", () => {
    let sampleMessage;
    beforeEach(async () => {
      sampleMessage = {
        name: "Apple Tree",
        type: "APPLE",
        age: 1020,
      };

      await aws.sqsClient
        .sendMessage({
          MessageBody: JSON.stringify(sampleMessage),
          QueueUrl: config.get("aws.sqs.queueUrl"),
        })
        .promise();
    });
    test("Should succeed in getting proper sqs message from queue", async () => {
      const data = await readMessage();
      expect(data).toMatchObject(sampleMessage);
    });
  });
});
