const { Schema, model } = require("mongoose");

const BookSchema = Schema({
  name: {
    type: String,
    required: [true],
    unique: true,
  },
  author: {
    type: String,
    required: [true],
  },
  description: {
    type: String,
    default: "N/A",
  },
  img: {
    type: String,
  },
  link: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

BookSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Book", BookSchema);
