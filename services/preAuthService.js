const moneris = require("moneris/index"),
  { serializeObject, getConnectionStatus } = require("../helpers/util");

class PreAuthService {
  constructor() {
    this.credentials = {
      store_id: process.env.STOREID,
      api_token: process.env.LD_API_KEY,
      test: process.env.test
    };
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
    console.log("create");
    console.log(JSON.stringify(response, 2, 2));
    return response;
  }

  preAuth(req) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(req.ld, this.credentials);
        let resp = await moneris(this.credentials, req.ld);
        console.log("preauth");
        console.log(JSON.stringify(resp, 2, 2));
        resolve(this.createEcomResponse(resp, req.cvv2));
      } catch (err) {
        console.log(err.message);
        reject(err.messsage);
      }
    });
  }
}

module.exports = PreAuthService;
