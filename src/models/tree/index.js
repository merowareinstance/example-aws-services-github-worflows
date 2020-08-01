const {
  DynamoDbSchema,
  DynamoDbTable,
  embed,
} = require("@aws/dynamodb-data-mapper");
const { v4 } = require("uuid");
const Tree = require("./tree");
const TreeMetadata = require("./treeMetadata");

Object.defineProperty(TreeMetadata.prototype, DynamoDbSchema, {
  value: {
    draft: { type: "Boolean" },
    tags: {
      type: "Set",
      memberType: "String",
    },
  },
});

Object.defineProperties(Tree.prototype, {
  [DynamoDbTable]: {
    value: "Trees",
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
        defaultProvider: v4,
      },
      createdAt: {
        type: "Date",
        keyType: "RANGE",
      },
      authorUsername: { type: "String" },
      title: { type: "String" },
      metadata: embed(TreeMetadata),
    },
  },
});

module.exports = Tree;
