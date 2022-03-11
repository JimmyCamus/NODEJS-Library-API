const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const uploadFile = async (model, file) => {
  if (model.img) {
    const splitedName = model.img.split("/");
    const fileName = splitedName[splitedName.length - 1];
    const [id] = fileName.split(".");
    cloudinary.uploader.destroy(id);
  }

  const { tempFilePath } = file;
  const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
  model.img = secure_url;
  await model.save();
};

const uploadLocalFile = async (files, extensions = ["pdf"], folder = "") => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const splitedName = file.name.split(".");
    const extension = splitedName[splitedName.length - 1];

    if (!extensions.includes(extension)) {
      return reject(`The extension ${extension} is not available`);
    }
    const tempName = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/books", folder, tempName);
    file.mv(uploadPath, function (e) {
      if (e) {
        return reject(e);
      }
    });
    resolve(tempName);
  });
};

module.exports = {
  uploadFile,
  uploadLocalFile,
};
