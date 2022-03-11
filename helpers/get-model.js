const User = require("../models/user");
const Book = require("../models/book");

const getModel = async (colection, id) => {
  return new Promise(async (resolve, reject) => {
    let model;
    let colectionName = "";

    switch (colection) {
      case "books":
        model = await Book.findById(id);
        colectionName = "book";
        break;

      case "users":
        model = await User.findById(id);
        colectionName = "user";
        break;

      default:
        return reject("The colection are not available");
    }

    if (!model) {
      return reject(`There is not ${colectionName} with id ${id}`);
    }

    resolve(model);
  });
};

module.exports = {
  getModel,
};
