const express = require("express");
const { getAPIs, subscribe, getUserSubscriptions } = require("../controller/subscriptionController");

const SubscriptionRouter = express.Router();

SubscriptionRouter.get("/apis", getAPIs);
SubscriptionRouter.post("/subscribe", subscribe);
SubscriptionRouter.get("/user/:userId", getUserSubscriptions);

module.exports = SubscriptionRouter;