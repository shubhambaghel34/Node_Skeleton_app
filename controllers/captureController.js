const CaptureService = require("../services/CaptureService"),
  { createResponse } = require("../helpers/util");

class CaptureController {
  constructor() {
    this.service = new CaptureService();
  }

  buildLDRequest(obj, type) {
    return {
      ld: {
        cust_id: String(obj.shopper.customerId),
        order_id: obj.context.transaction.kiboTransactionId,
        comp_amount: String(obj.amount),
        type,
        crypt_type: 7
      },
      cvv2: obj.card.cvv
    };
  }

  async postCapture(req) {
    console.log(this.buildLDRequest(req.body, "completion"));
    return new Promise(async (resolve, reject) => {
      try {
        resolve(
          await this.service.capture(
            this.buildLDRequest(req.body, "completion")
          )
        );
      } catch (err) {
        let resp = createResponse(400, err);
        reject(resp);
      }
    });
  }
}

module.exports = CaptureController;
