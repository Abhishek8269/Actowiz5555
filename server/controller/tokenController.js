const connection = require("../Model/dbConnect")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config();

exports.generateToken = (req, res) => {
    console.log("Received Body:", req.body); 

    const { api_id } = req.body;
    const user_id = req.user_id; 

    console.log("Received user_id:", user_id, "API ID:", api_id);

    if (!user_id || !api_id) {
        return res.status(400).json({ message: "user_id and api_id are required" });
    }

    
    connection.query(
        "SELECT * FROM subscriptions WHERE user_id = ? AND api_id = ?",
        [user_id, api_id],
        (err, results) => {
            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: err.message });
            }

            if (results.length === 0) {
                return res.status(400).json({ message: "You are not subscribed to this API" });
            }

            const token = jwt.sign({ user_id, api_id }, process.env.JWT_SECRET, { expiresIn: "7d" });

            console.log("Generated Token:", token);

            
            connection.query(
                "INSERT INTO tokens (user_id, api_id, token) VALUES (?, ?, ?)",
                [user_id, api_id, token],
                (err, result) => {
                    if (err) {
                        console.error("Token Insert Error:", err.sqlMessage);
                        return res.status(500).json({ message: err.sqlMessage });
                    }

                    console.log("Token Inserted Successfully, ID:", result.insertId);
                    res.json({ token });
                }
            );
        }
    );
};




