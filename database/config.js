const mongoose = require("mongoose");

const dbConection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("db online");
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  dbConection,
};
