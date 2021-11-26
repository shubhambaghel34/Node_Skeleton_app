const express = require("express"),
  router = express.Router(),
  Controller = require("../controllers/authorizeController"),
  controller = new Controller();

/*
This is the authorize route. 

This will be called by /authorize as registered in app.js
*/

router.post("/", async (req, res) => {
  try {
    let resp = await controller.postAuthorize(req);
    console.log(resp);
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.body);
  }
});

router.get("/", async (req, res) => {
  res.status(200).send({
    msg: "authorize"
  });
});

module.exports = router;
