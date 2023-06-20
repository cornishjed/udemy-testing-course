// connect mongoose to mongodb
const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://jed:o3ky0u3eqKpA9Usx@todo-add.9w5eexf.mongodb.net/",
      { useNewUrlParser: true }
    );
  } catch (err) {
    console.error("Error connecting to mongodb");
    console.error(err);
  }
}

module.exports = { connect };
