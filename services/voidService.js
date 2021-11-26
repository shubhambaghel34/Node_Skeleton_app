const moneris = require("moneris/index"),
  { serializeObject, getConnectionStatus } = require("../helpers/util");

class VoidService {
  constructor() {
    this.credentials = {
      store_id: process.env.STOREID,
      api_token: process.env.LD_API_KEY,
      test: process.env.test
    };
  }

  createEcomResponse(ldObj) {
    console.log(ldObj);
    let timeout = ldObj.TimedOut[0] === "true",
      complete = ldObj.Complete[0] === "true";
    let response = {
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

  void(req) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(req.ld, this.credentials);
        let resp = await moneris(this.credentials, req.ld);
        console.log(JSON.stringify(resp, 2, 2));
        resolve(this.createEcomResponse(resp));
      } catch (err) {
        console.log(err.message);
        reject(err.messsage);
      }
    });
  }
}

module.exports = VoidService;
