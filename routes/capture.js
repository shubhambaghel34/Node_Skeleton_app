const express = require("express"),
  router = express.Router(),
  Controller = require("../controllers/captureController"),
  controller = new Controller();

/*
This is the capture route. 

This will be called by /capture as registered in app.js.
*/

router.post("/", async (req, res) => {
  try {
    let resp = await controller.postCapture(req);
    console.log(resp);
    res.status(200).send(resp);
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).send(err.body);
  }
});

router.get("/", async (req, res) => {
  res.status(200).send({
    r: "capture"
  });
});

module.exports = router;
