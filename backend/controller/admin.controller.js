// Packages
const jwt = require("jsonwebtoken");

// Imports from the database
const pool = require("../db/db");

// JWT Scerate key
const jwt_key =
  "36c5f515e773048ddb6ae7df26b407b4f683ca3ac5e68ec640c262154c0573d269fb907b0e559571a0be6db01450bd3f84cc689fb9e1f250ddb9b43e3ed454d8";

// Login for admin
const verifyLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = `
      SELECT username, role
      FROM "login"
      WHERE username = $1 AND password = $2
    `;
    const values = [username, password];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      const token = jwt.sign(
        { username: user.username, role: user.role },
        jwt_key,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // false for HTTP, true for HTTPS
        maxAge: 3600000,
      });

      return res.status(200).json({
        success: true,
        user,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { verifyLogin };
