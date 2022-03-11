const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      books: "/api/books",
      categories: "/api/categories",
      comments: "/api/comments",
      searches: "/api/searches",
      uploads: "/api/uploads",
      users: "/api/users",
    };
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  async dbConnect() {
    await dbConection();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.books, require("../routes/book"));
    this.app.use(this.paths.categories, require("../routes/category"));
    this.app.use(this.paths.comments, require("../routes/comment"));
    this.app.use(this.paths.searches, require("../routes/search"));
    this.app.use(this.paths.uploads, require("../routes/upload"));
    this.app.use(this.paths.users, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }
}

module.exports = Server;
