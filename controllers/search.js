const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;
const User = require("../models/user");
const Book = require("../models/book");
const Category = require("../models/category");

const searchBooks = async (term, res) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const book = await Book.findById(term);
    return res.json({ results: book ? [book] : [] });
  }

  const regex = new RegExp(term, "i");
  const books = await Book.find({ name: regex, state: true })
    .populate("user", "name")
    .populate("category", "name");
  res.json({ results: books });
};

const searchCategories = async (term, res) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const category = await Category.findById(term);
    return res.json({ results: category ? [category] : [] });
  }

  const regex = new RegExp(term, "i");
  const category = await Category.find({ name: regex, state: true }).populate(
    "user",
    "name"
  );
  res.json({ results: category });
};

const searchUsers = async (term, res) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);
    return res.json({ results: user ? [user] : [] });
  }

  const regex = new RegExp(term, "i");
  const user = await User.find({
    $or: [{ name: regex }, { email: regex }],
    $and: [{ state: true }],
  });
  res.json({ results: user });
};

const index = async (req = request, res = response) => {
  const { colection, term } = req.params;

  switch (colection) {
    case "books":
      searchBooks(term, res);
      break;

    case "categories":
      searchCategories(term, res);
      break;

    case "users":
      searchUsers(term, res);
      break;

    default:
      res
        .status(500)
        .json({ msg: `The colection ${colection} is not available.` });
  }
};

module.exports = {
  index,
};
