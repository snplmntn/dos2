//Libraries
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Routes
const authRoute = require("./routes/Account/auth");
const userRoute = require("./routes/Account/user");
const verifyRoute = require("./routes/Account/verify");
const uploadRoute = require("./routes/Account/upload");
const mailRoute = require("./routes/Account/mail");

const postRoute = require("./routes/Content/post");
const announcementRoute = require("./routes/Content/announcement");
const articleRoute = require("./routes/Content/article");
const searchRoute = require("./routes/Content/search");

const aliveRoute = require("./routes/alive");
//Initialization
const app = express();
const port = 5555;

//Middlewares
app.use(express.json());
dotenv.config();

//User
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/verify", verifyRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/mail", mailRoute);

//Content
app.use("/api/post", postRoute);
app.use("/api/announcement", announcementRoute);
app.use("/api/article", articleRoute);
app.use("/api/search", searchRoute);

//Others
app.use("/api/alive", aliveRoute);

mongoose.connect(process.env.MONGO_URI);

app.listen(port, async () => {
  console.log("Server Started " + port);
});
