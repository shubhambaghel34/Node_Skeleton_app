require("dotenv").config();
const express = require("express");
const authorizeRouter = require("./routes/authorize");
const authorizeAndCaptureRouter = require("./routes/authorizeAndCapture");
const creditRouter = require("./routes/credit");
const voidRouter = require("./routes/void");
const captureRouter = require("./routes/capture");
const logger = require("morgan");

// register the app
const app = express();

// app runs on port 3000 by default. You can change this by editing this value
const port = process.env.PORT || 3000;
app.use(
  logger(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"',
    {
      immediate: true
    }
  )
);

// json is required by the platform
app.use(express.json());

// registering routes for express
app.use("/authorize", authorizeRouter);
app.use("/authorizeandcapture", authorizeAndCaptureRouter);
app.use("/credit", creditRouter);
app.use("/void", voidRouter);
app.use("/capture", captureRouter);

// run the application
app.listen(port, () =>
  console.log(`Example payment gateway app listening on port ${port}!`)
);
const Controller = require("./controllers/authorizeController"),
  controller = new Controller();
const PreAuthService = require("./services/preAuthService"),
  service = new PreAuthService();
// console.log(service.credentials);
module.exports = app;

const send = require("radial/index");
var credentials = {
  store_id: "store5",
  api_token: "yesguy",
  test: true
};

// var purchase = {
//     type: 'completion',
//     txn_number: '935765-0s_15',
//     order_id: 'orders-159876s-13:31:08',
//     comp_amount: '0.10',
//     crypt_type: 7,
//     cust_id: 'cust id'
// }

var purchase = {
  type: "preauth",
  crypt_type: 7,
  cust_id: "10234",
  order_id: "56:sa09sdd.5641691Z",
  amount: "5.97",
  pan: "4242424242424242",
  expdate: 2021
};

send(credentials, purchase).then((result) => {
  console.log(JSON.stringify(result, 2, 2));
});
let test = {
  ReceiptId: ["33-2020-05-13T06:58:44.3142146Z"],
  ReferenceNum: ["660053720010546910"],
  ResponseCode: ["027"],
  ISO: ["01"],
  AuthCode: ["161868"],
  TransTime: ["02:58:45"],
  TransDate: ["2020-05-13"],
  TransType: ["01"],
  Complete: ["true"],
  Message: ["APPROVED           *                    ="],
  TransAmount: ["36.99"],
  CardType: ["V"],
  TransID: ["986805-0_15"],
  TimedOut: ["false"],
  BankTotals: ["null"],
  Ticket: ["null"],
  CorporateCard: ["false"],
  MessageId: ["1F0134107255101"],
  IsVisaDebit: ["false"]
};
let x = {
  ld: {
    cust_id: "1023",
    order_id: "39-2020-05-13T07:41:32.4590284Z",
    amount: 36.99,
    pan: "4242424242424242",
    expdate: 2020
  },
  cvv2: "123"
};
