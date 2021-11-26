const VoidService = require("../services/voidService"),
  { createResponse } = require("../helpers/util");

class VoidController {
  constructor() {
    this.service = new VoidService();
  }

  buildLDRequest(obj, type) {
    return {
      ld: {
        cust_id: String(obj.shopper.customerId),
        order_id: this.retrieveResponseData(
          obj.context.transaction.gatewayInteractions[0],
          "ReceiptId"
        ),
        txn_number: this.retrieveResponseData(
          obj.context.transaction.gatewayInteractions[0],
          "TransID"
        ),
        type,
        crypt_type: 7
      }
    };
  }

  postVoid(req) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(this.buildLDRequest(req.body));
        let response = await this.service.void(
          this.buildLDRequest(req.body, "purchasecorrection")
        );
        resolve(response);
      } catch (err) {
        let resp = createResponse(400, err);
        reject(resp);
      }
    });
  }
}

module.exports = VoidController;
