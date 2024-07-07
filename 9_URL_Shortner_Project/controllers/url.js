//Third Party App being used to create shortID
const shortid = require("shortid");
//Calling the Model to be controlled by controller
const URL = require("../models/url");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ status: "url is required" });
  }
  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });
  return res.status(201).json({ status: `Your short id is ${shortID}` });
}

async function handleRedirectToURL(req, res) {
  const shortId = req.params.shortId;
  //After updating it returns the updated object
  //shortId is passed to find the desired object , then we push in the updated visitHistory into it
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  return res.redirect(entry.redirectUrl);
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({
    shortId,
  });

  return res.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectToURL,
  handleAnalytics,
};
