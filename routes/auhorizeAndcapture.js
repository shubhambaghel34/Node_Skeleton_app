const express = require("express");
const router = express.Router();

/*
This is the authorize and capture route. 

This will be called by /authorizeandcapture as registered in app.js
*/

router.post("/", async (req, res) => {
  console.log(JSON.stringify(res.body, 2, 2));
});

router.get("/", async (req, res) => {
  res.status(200).send({ msg: "authcap" });
});

module.exports = router;
