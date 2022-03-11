const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const index = async (req, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.count(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    data: users,
  });
};

const store = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();
  res.status(201).json({
    data: user,
  });
};

const update = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, rest);

  res.json({
    data: user,
  });
};

const destroy = async (req, res = response) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, { state: false });
  res.json({
    msg: `The user with id ${id} was deleted`,
  });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
