const uuid = require("uuid");
const { getTreeLocationFromS3 } = require("../forest.service");
const { aws, config } = require("../../modules");

describe("Forest Service Integration Test", () => {
  describe("getTreeLocationFromS3", () => {
    let objectKey;
    let sampleObj;
    beforeEach(async () => {
      sampleObj = {
        type: "APPLE",
        lat: "4.915833",
        long: "23.823650",
      };
      objectKey = `tree${uuid.v4()}Location.json`;
      await aws.s3Client
        .putObject({
          Body: JSON.stringify(sampleObj),
          Bucket: config.get("aws.s3.bucketName"),
          Key: objectKey,
        })
        .promise();
    });
    test("Should succeed in getting proper tree location from bucket file", async () => {
      const data = await getTreeLocationFromS3(objectKey);
      expect(data).toMatchObject(sampleObj);
    });
  });
});
