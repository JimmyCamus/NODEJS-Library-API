const Book = require("../models/book");
const Category = require("../models/category");
const Comment = require("../models/comment");
const Role = require("../models/role");
const User = require("../models/user");

const roleValidator = async (role = "") => {
  const existRole = await Role.findOne({ role });
  if (!existRole) {
    throw new Error(`the role "${role}" is not defined`);
  }
};

const emailValidator = async (email = "") => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`The email: ${email} alredy exist`);
  }
};

const idValidator = async (id) => {
  const existId = await User.findById(id);
  if (!existId) {
    throw new Error(`The id: ${id} dosent exist`);
  }
};

const categoryValidator = async (id) => {
  const existId = await Category.findById(id);
  if (!existId) {
    throw new Error(`The id: ${id} dosent exist`);
  }
};

const bookValidator = async (id) => {
  const existId = await Book.findById(id);
  if (!existId) {
    throw new Error(`The id: ${id} dosent exist`);
  }
};

const commentValidator = async (id) => {
  const existId = await Comment.findById(id);
  if (!existId) {
    throw new Error(`The id: ${id} dosent exist`);
  }
};

const validateColection = (colection = "", availableColections = []) => {
  if (!availableColections.includes(colection)) {
    throw new Error(
      `The colection: ${colection} is not in the availables colections -> ${avaliablesColections}`
    );
  }
  return true;
};

module.exports = {
  roleValidator,
  emailValidator,
  idValidator,
  categoryValidator,
  bookValidator,
  commentValidator,
  validateColection,
};
