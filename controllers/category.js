const { request, response } = require("express");
const Category = require("../models/category");

const index = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, categories] = await Promise.all([
    Category.count(query),
    Category.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name"),
  ]);

  res.json({
    total,
    data: categories,
  });
};

const show = async (req = request, res = response) => {
  const category = await Category.findById(req.params.id).populate(
    "user",
    "name"
  );
  if (!category.state) {
    return res
      .status(404)
      .json({ msg: `The category with id ${req.params.id} doesnt exists` });
  }

  res.json({ data: category });
};

const store = async (req = request, res = response) => {
  const { name } = req.body;
  const user = req.authUser;
  const dbCategory = await Category.findOne({ name });

  if (dbCategory) {
    return res
      .status(400)
      .json({ msg: `The category with name ${name} alredy exists` });
  }

  const category = await new Category({ name, user });
  await category.save();

  res.status(201).json({ data: category });
};

const update = async (req = request, res = response) => {
  const { name } = req.body;
  const user = req.authUser;
  const dbCategory = await Category.findOne({ name });

  if (dbCategory) {
    return res
      .status(400)
      .json({ msg: `The category with name ${name} alredy exists` });
  }

  const category = await Category.findById(req.params.id);
  category.name = name;
  category.user = user._id;
  category.save();

  res.json({ data: category });
};

const destroy = async (req = request, res = response) => {
  const category = await Category.findById(req.params.id);
  category.state = false;
  category.save();

  res.json({ data: category });
};

module.exports = { index, show, store, update, destroy };
