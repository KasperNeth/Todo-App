const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

module.exports = {
  setupDB: async () => {
    mongoServer = await MongoMemoryServer.create({
      instance: {
        dbName: "testdb",
      },
      binary: {
        downloadTimeout: 60000, 
      },
      spawn: {
        wtimeout: 30000,
      },
    });
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
  },
  teardownDB: async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  },
};

