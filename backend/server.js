// Packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Folders for the router
const router = require("./router/admin.routes");

// Folders for the middleware
const { checkAuth } = require("./middleware/auth.middleware");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/admin", router);
app.get("/protected", checkAuth, (req, res) => {
  res.json({
    success: true,
    user: {
      username: req.user.username,
      role: req.user.role,
    },
  });
});

app.listen(3000, () => console.log("Running on 3000"));
