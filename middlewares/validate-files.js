const { response, request } = require("express");

const validateFiles = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  if (!req.files.file) {
    return res.status(400).send("No files were uploaded.");
  }
  next();
};

module.exports = {
  validateFiles,
};
