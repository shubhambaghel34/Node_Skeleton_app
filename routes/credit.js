const express = require("express"),
  router = express.Router(),
  Controller = require("../controllers/creditController"),
  controller = new Controller();

/*
This is the credit route. 

This will be called by /credit as registered in app.js.
*/

router.post("/", async (req, res) => {
  try {
    let resp = await controller.postCredit(req);
    console.log(resp);
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.body);
  }
});

router.get("/", async (req, res) => {
  res.status(200).send({
    msg: "credit"
  });
});

module.exports = router;
