const { getTreesByFruitId } = require("../forest.service");
const { db } = require("../../modules");

const { Tree, Fruit } = db.models;

describe("Forest Service Integration Test", () => {
  describe("getTreesByFruitId", () => {
    let greenApple;
    let appleTree;

    beforeEach(async () => {
      // Clear db as we will probs run this in parallel
      await db.sequelize.sync({ force: true });

      // Create Trees for those fruits
      appleTree = await Tree.create({
        age: 1000,
        type: Tree.types.APPLE,
      });

      // Create Fruits
      await Fruit.create({
        type: Tree.types.APPLE,
        color: Fruit.colors.RED,
        tree_id: appleTree.id,
      });

      greenApple = await Fruit.create({
        type: Tree.types.APPLE,
        color: Fruit.colors.GREEN,
        tree_id: appleTree.id,
      });
    });

    afterAll(async () => {
      // Clear db as we will probs run this in parallel
      await db.sequelize.sync({ force: true });
    });

    test("Should return all trees by id properly if found", async () => {
      const treeFound = await getTreesByFruitId(greenApple.id);
      expect(treeFound.id).toEqual(appleTree.id);
      expect(treeFound.age).toEqual(appleTree.age);
    });

    test("Should return no trees if not found", async () => {
      const treeFound = await getTreesByFruitId(50000);
      expect(treeFound).toEqual(null);
    });
  });
});
