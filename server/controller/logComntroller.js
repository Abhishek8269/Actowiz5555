const connection = require('../Model/dbConnect');

exports.createLog = (req, res) => {
    const { user_id, api_id, status } = req.body;
    const validStatuses = ['success', 'failure'];

    
    console.log("Received status:", status);

    
    if (!status || typeof status !== 'string' || !validStatuses.includes(status.trim().toLowerCase())) {
        return res.status(400).json({ error: 'Invalid status value. Allowed values: success, failure' });
    }

    
    const formattedStatus = status.trim().toLowerCase();

    const query = 'INSERT INTO logs (user_id, api_id, status) VALUES (?, ?, ?)';
     connection.query(query, [user_id, api_id, formattedStatus], (err, result) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Log entry created', logId: result.insertId });
    });
};

exports.getLogs = (req, res) => {
  const query = 'SELECT * FROM logs ';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};
