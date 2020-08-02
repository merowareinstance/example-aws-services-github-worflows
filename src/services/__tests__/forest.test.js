const uuid = require("uuid");
const { getTreeLocationFromS3, getAppleTypes } = require("../forest.service");
const { aws, config, db } = require("../../modules");

const { Fruit, Tree } = db.models;

describe("Forest Service Integration Test", () => {
  describe("getAppleTypes", () => {
    let fruit;
    let tree;
    beforeEach((done) => {
      return Fruit.create(
        {
          type: "apple",
          color: "red",
        },
        (errorFruitCreate, fruitCreated) => {
          if (errorFruitCreate) {
            return done();
          }
          if (fruitCreated) {
            fruit = fruitCreated;
          }

          return Tree.create(
            {
              type: "apple",
              age: 1023,
            },
            (errorTreeCreate, treeCreated) => {
              if (errorTreeCreate) {
                return done();
              }
              if (treeCreated) {
                tree = treeCreated;
              }
              return done();
            }
          );
        }
      );
    });

    test("Should get all trees and fruits of type apple", async () => {
      const data = await getAppleTypes();
      expect(data).toEqual([fruit, tree]);
    });
  });

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
