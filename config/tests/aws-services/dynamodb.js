const { db } = require("../../../src/modules");

function createTables() {
  return new Promise((resolve) => {
    db.createTables((error) => {
      if (error) {
        // Don't reject on error since we don't currently
        // have cleanup of tables
        console.log(error);
      }
      resolve();
    });
  });
}

module.exports = {
  createTables,
};
