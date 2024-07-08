const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleRedirectToURL,
  handleAnalytics,
} = require("../controllers/url");

//This route is to create new shortID for a redirectURL
router.post("/", handleGenerateNewShortURL);

//When user access the endpoint with shortID it should get redirected to the original url
router.get("/:shortId", handleRedirectToURL);

//A route that shares the visitHistory count and analytics
router.get("/analytics/:shortId", handleAnalytics);

module.exports = router;
