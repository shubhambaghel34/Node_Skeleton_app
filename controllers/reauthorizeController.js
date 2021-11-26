const ReauthService = require("../services/reauthService"),
  { createResponse } = require("../helpers/util");

class ReauthorizeController {
  constructor() {
    this.service = new ReauthService();
  }

  buildLDRequest(obj, type) {
    return {
      ld: {
        cust_id: String(obj.shopper.customerId),
        order_id: `${obj.context.transaction.kiboTransactionId}-${obj.context.transaction.createdOn}`,
        amount: String(obj.amount),
        pan: String(obj.card.numberPart),
        expdate: String(obj.card.expireYear),
        type,
        crypt_type: 7
      },
      cvv2: obj.card.cvv,
      orderId: obj.shopper.customerId
    };
  }

  postReauthorize(req) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(this.buildLDRequest(req.body));
        let response = await this.service.ReauthOrCapture(
          this.buildLDRequest(req.body, "reauth")
        );
        resolve(response);
      } catch (err) {
        let resp = createResponse(400, err);
        reject(resp);
      }
    });
  }
}

module.exports = ReauthorizeController;
