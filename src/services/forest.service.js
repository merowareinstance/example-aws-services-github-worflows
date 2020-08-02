const { aws, config, db } = require("../modules");

const { Fruit, Tree } = db.models;

function getAppleTypes() {
  return new Promise((resolve, reject) => {
    const data = [];
    const type = "apple";
    return Fruit.get(type, (errorFruit, itemFruit) => {
      if (errorFruit) {
        return reject(errorFruit);
      }

      if (itemFruit) {
        data.push(itemFruit);
      }

      return Tree.get(type, (errorTree, itemTree) => {
        if (errorTree) {
          return reject(errorTree);
        }

        if (itemTree) {
          data.push(itemTree);
        }

        return resolve(data);
      });
    });
  });
}

async function getTreeLocationFromS3(objectKey) {
  let data;
  try {
    data = await aws.s3Client
      .getObject({
        Bucket: config.get("aws.s3.bucketName"),
        Key: objectKey,
      })
      .promise();
  } catch (e) {
    console.log(new Error("Error during get object service"), e);
  }
  return data && data.Body ? JSON.parse(data.Body.toString()) : null;
}

module.exports = {
  getAppleTypes,
  getTreeLocationFromS3,
};
