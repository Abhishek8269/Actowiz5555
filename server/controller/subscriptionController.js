const subscriptionModel = require("../Model/subscriptionModel");

const getAPIs = (req, res) => {
  subscriptionModel.getAllAPIs((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

const subscribe = (req, res) => {
  const { user_id, api_id } = req.body;
  if (!user_id || !api_id) {
    return res.status(400).json({ error: "UserId and ApiId are required" });
  }

  subscriptionModel.subscribeToAPI(user_id, api_id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Subscribed successfully", subscriptionId: result.insertId, userId:user_id,apiId:api_id});
  });
};

const getUserSubscriptions = (req, res) => {
  const { userId } = req.params;
  subscriptionModel.getUserSubscriptions(userId, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

module.exports = { getAPIs, subscribe, getUserSubscriptions };