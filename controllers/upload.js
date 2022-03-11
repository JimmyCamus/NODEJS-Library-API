const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const { getModel } = require("../helpers/get-model");
const { uploadFile, uploadLocalFile } = require("../helpers/upload-files");

const localIndex = async (req = request, res = response) => {
  const { colection, id } = req.params;
  try {
    const model = await getModel(colection, id);
    if (model.link) {
      const filePath = path.join(
        __dirname,
        "../uploads/books",
        model._id.toString(),
        model.link
      );
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath);
      }
    }
    res.json({ msg: "There is not a file, please talk to the admin", model });
  } catch (error) {
    res.json({ error });
  }
};

const localStore = async (req = request, res = response) => {
  const { colection, id } = req.params;
  const authUser = req.authUser;
  try {
    const model = await getModel(colection, id);
    if (authUser._id.toString() != model.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    if (model.link) {
      const filePath = path.join(
        __dirname,
        "../uploads/books",
        model._id.toString(),
        model.link
      );
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    model.link = await uploadLocalFile(
      req.files,
      ["pdf"],
      model._id.toString()
    );
    await model.save();
    res.json({ model });
  } catch (error) {
    res.json({ error });
  }
};

const update = async (req = request, res = response) => {
  const { colection, id } = req.params;
  const authUser = req.authUser;
  try {
    const model = await getModel(colection, id);
    if (authUser._id.toString() != model.user) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    await uploadFile(model, req.files.file);
    res.json({ model });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Error" });
  }
};

module.exports = {
  update,
  localIndex,
  localStore,
};
