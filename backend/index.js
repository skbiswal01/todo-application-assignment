const express = require("express");
const app = express();
var cors = require("cors");
app.use(express.json());
app.use(cors());
const userHandler = require("./controllers/userhandle");
const taskHandler = require("./controllers/taskhandle");
const { login, register } = require("./Authentication/auth");
// login
app.post("/login", login);
// register
app.post("/register", register);

// userhandle
app.use("/user", userHandler);

// taskhandle 
app.use("/task", taskHandler)


// server
app.listen("3008", () => {
    console.log("listening port 3008")
})