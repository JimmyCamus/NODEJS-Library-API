const { request, response } = require("express");
const { uploadFile } = require("../helpers/upload-files");
const Book = require("../models/book");

const index = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };

  const [total, books] = await Promise.all([
    Book.count(query),
    Book.find(query)
      .skip(Number(from))
      .limit(Number(limit))
      .populate("user", "name")
      .populate("category", "name"),
  ]);

  res.json({
    total,
    data: books,
  });
};

const show = async (req = request, res = response) => {
  const book = await Book.findById(req.params.id)
    .populate("user", "name")
    .populate("category", "name");

  if (!book.state) {
    return res
      .status(404)
      .json({ msg: `The book with id ${req.params.id} doesnt exists` });
  }

  res.json({ data: book });
};

const store = async (req = request, res = response) => {
  const { name, ...rest } = req.body;
  const user = req.authUser;
  const dbBook = await Book.findOne({ name });

  if (dbBook) {
    return res.status(400).json({ msg: `The book ${name} alredy exists` });
  }

  const data = { name, user: user._id, ...rest };
  const book = await new Book(data);
  await uploadFile(book, req.files.file)
  await book.save();

  res.status(201).json({ data: book });
};

const update = async (req = request, res = response) => {
  const { state, user, name, ...rest } = req.body;
  const authUser = req.authUser;
  const dbBook = await Book.findOne({ name });

  if (dbBook) {
    return res.status(400).json({ msg: `The book ${name} alredy exists` });
  }

  const data = { name, user: authUser._id, ...rest };
  const book = await Book.findOneAndUpdate(req.params.id, data);

  res.json({ data: book });
};

const destroy = async (req = request, res = response) => {
  const book = await Book.findById(req.params.id);
  book.state = false;
  await book.save();

  res.json({ data: book });
};

module.exports = { index, show, store, update, destroy };
