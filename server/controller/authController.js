const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connection = require("../Model/dbConnect");
const dotenv = require("dotenv");
dotenv.config();

const register = (req, res) => {
  const { email, password } = req.body;

  connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ error: "Email already registered" });

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ error: err.message });

      connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  });
};

const login = (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
  
    
    connection.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
  
      if (results.length === 0) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const user = results[0];
  
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });
  
       
        const token = jwt.sign({ user_id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie('token', token, { httpOnly: true });
  
        
        res.json({
          message: "Login successful",
          user_id: user.id,
          token: token
        });
      });
    });
  };

module.exports = { register, login };