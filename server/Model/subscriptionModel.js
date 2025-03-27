const connection = require("../Model/dbConnect");

const getAllAPIs = (callback) => {
  connection.query("SELECT * FROM apis", (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const subscribeToAPI = (user_id, api_id, callback) => {
  connection.query(
    "INSERT INTO subscriptions (user_id, api_id) VALUES (?, ?)",
    [user_id, api_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

const getUserSubscriptions = (user_id, callback) => {
  connection.query(
    `SELECT apis.api_name, subscriptions.subscription_date 
     FROM subscriptions 
     JOIN apis ON subscriptions.api_id = apis.id 
     WHERE subscriptions.user_id = ?`,
    [user_id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results);
    }
  );
};

module.exports = { getAllAPIs, subscribeToAPI, getUserSubscriptions };