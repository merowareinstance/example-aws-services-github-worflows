const { aws } = require("../../../src/modules");

async function createBucket(name) {
  console.log(name);
  return aws.s3Client
    .createBucket({
      Bucket: name,
    })
    .promise();
}

async function deleteBucket(name) {
  return aws.s3Client
    .createBucket({
      Bucket: name,
    })
    .promise();
}

module.exports = {
  createBucket,
  deleteBucket,
};
