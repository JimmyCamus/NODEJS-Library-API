const { Schema, model } = require("mongoose");

const CommentSchema = Schema({
  content: {
    type: String,
    required: [true],
  },
  state: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  }
});

CommentSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Comment", CommentSchema);
