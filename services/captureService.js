const moneris = require("moneris/index"),
  { serializeObject, getConnectionStatus } = require("../helpers/util"),
  OrderService = require("./orderService"),
  apiContext = require("mozu-node-sdk/clients/platform/application")();

class CaptureService {
  constructor() {
    this.credentials = {
      store_id: process.env.STOREID,
      api_token: process.env.LD_API_KEY,
      test: process.env.test
    };
    this.orderService = new OrderService(apiContext);
  }

  createEcomResponse(ldObj, cvv2) {
    console.log(ldObj);
    let timeout = ldObj.TimedOut[0] === "true",
      complete = ldObj.Complete[0] === "true";
    let response = {
      authCode: ldObj.AuthCode[0],
      cvV2Codes: cvv2,
      isDeclined: Number(ldObj.ResponseCode[0]) > 50 ? true : false,
      responseCode: ldObj.ResponseCode[0],
      responseText: ldObj.Message[0],
      transactionId: ldObj.TransID[0],
      remoteConnectionStatus: getConnectionStatus(
        ldObj.Message[0],
        timeout,
        complete
      ),
      responseData: serializeObject(ldObj)
    };
    return response;
  }

  capture(req) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(req.ld, this.credentials);
        let orderResp = await this.orderService.getOrder(req.ld.order_id);
        let order = orderResp.items[0];
        if (order) {
          req.ld["txn_number"] = order.payments.data.txnNumber
            ? order.payments.data.txnNumber
            : "";
          let resp = await moneris(this.credentials, req.ld);
          console.log(JSON.stringify(resp, 2, 2));
          resolve(this.createEcomResponse(resp, req.cvv2));
        } else {
          reject("no order found!");
        }
      } catch (err) {
        console.log(err.message);
        reject(err.messsage);
      }
    });
  }
}

module.exports = CaptureService;
