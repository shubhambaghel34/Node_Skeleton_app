const CreditService = require("../services/creditService"),
  { createResponse } = require("../helpers/util");

class CreditController {
  constructor() {
    this.service = new CreditService();
  }

  buildLDRequest(obj, type) {
    return {
      ld: {
        cust_id: String(obj.shopper.customerId),
        order_id: this.retrieveResponseData(
          obj.context.transaction.gatewayInteractions[0],
          "ReceiptId"
        ),
        amount: String(obj.amount),
        txn_number: this.retrieveResponseData(
          obj.context.transaction.gatewayInteractions[0],
          "TransID"
        ),
        type,
        crypt_type: 7
      }
    };
  }

  postCredit(req) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(this.buildLDRequest(req.body));
        let response = await this.service.credit(
          this.buildLDRequest(req.body, "refund")
        );
        resolve(response);
      } catch (err) {
        let resp = createResponse(400, err);
        reject(resp);
      }
    });
  }
}

module.exports = CreditController;
