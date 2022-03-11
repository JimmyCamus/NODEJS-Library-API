const { request, response } = require("express");
const Comment = require("../models/comment");

const index = async (req = request, res = response) => {
  const { bookId } = req.body;
  const query = { state: true, book: bookId };
  const comments = await Comment.find(query)
    .populate("user", "name")
    .populate("book", "name");
  res.json({ comments });
};

const store = async (req = request, res = response) => {
  const { bookId, content } = req.body;
  const authUser = req.authUser;
  const data = {
    content,
    book: bookId,
    user: authUser._id,
  };
  const comment = await new Comment(data);
  await comment.save();

  res.status(201).json({ comment });
};

const update = async (req = request, res = response) => {
  const { id } = req.params;
  const { content } = req.body;
  const authUser = req.authUser;

  const comment = await Comment.findById(id)
    .populate("user", "name")
    .populate("book", "name");

  if (!comment) {
    return res
      .status(404)
      .json({ msg: `The comment with id ${id} doesnt exists` });
  }

  if (comment.user._id != authUser._id.toString()) {
    return res.status(400).json({ msg: `Auth error` });
  }

  comment.content = content;
  await comment.save();

  res.json({ comment });
};

const destroy = async (req = request, res = response) => {
  const { id } = req.params;
  const authUser = req.authUser;

  const comment = await Comment.findById(id);

  if (!comment) {
    return res
      .status(404)
      .json({ msg: `The comment with id ${id} doesnt exists` });
  }

  if (comment.user != authUser._id.toString()) {
    return res.status(400).json({ msg: `Auth error` });
  }

  comment.state = false;
  await comment.save();

  res.json({ comment });
};

module.exports = {
  index,
  store,
  update,
  destroy,
};
