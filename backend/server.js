// Packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Imports from routes folder
const router = require("./router/admin.routes");

// Imports the authenticate the folder
const { checkAuth } = require("./middleware/auth.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/admin", router);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/protected", checkAuth);

app.listen(3000, () => console.log("Running on 3000"));
