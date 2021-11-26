const express = require("express");
const router = express.Router();

/*
This is the void route. 

This will be called by /void as registered in app.js.
*/

router.post("/", async (req, res) => {
  console.log(JSON.stringify(req.body, 2, 2));
});

module.exports = router;
