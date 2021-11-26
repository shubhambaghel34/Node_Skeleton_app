const Bottleneck = require("bottleneck");

const statusEnums = {
  SUCCESS: "Success",
  TIMEOUT: "Timeout",
  REJECT: "Reject",
  UNAUTH: "Unauth",
  ERROR: "Error",
  NOTFOUND: "NotFound"
};

module.exports = {
  /**
   * Bottleneck queue
   */
  limiter() {
    return new Bottleneck({
      maxConcurrent: 1,
      minTime: 300
    });
  },
  /**
   * Return custom HTTP status code
   * @param {Number} status - Status code eg. 200, 400, 500, etc.
   * @param {String} res - Response data
   */
  createResponse(status, res) {
    return {
      statusCode: status,
      body: JSON.stringify(
        {
          message: res
        },
        null,
        2
      )
    };
  },
  /**
   * Serialize object into key:key value:value pairs
   * @param {Object} obj - Response object
   */
  serializeObject(obj) {
    let data = [];
    Object.keys(obj).forEach((key) => {
      data.push({
        key: key,
        value: obj[key][0]
      });
    });
    return data;
  },
  /**
   * Set status of connection based on response message
   * @param {String} msg - Response message
   * @param {Boolean} timeout - Request timed out?
   * @param {Boolean} complete - Request completed?
   */
  getConnectionStatus(msg, timeout, complete) {
    let status = statusEnums.ERROR;
    if (timeout) {
      status = statusEnums.TIMEOUT;
    } else if (!complete && !timeout) {
      if (msg.includes("API token mismatch")) status = statusEnums.UNAUTH;
      else if (msg.includes("Invalid") || msg.includes("Cancelled"))
        status = statusEnums.REJECT;
      else if (msg.includes("No Pre-auth corresponds"))
        status = statusEnums.NOTFOUND;
    } else if (complete && !timeout) {
      if (msg.includes("DECLINED")) status = statusEnums.REJECT;
      else status = statusEnums.SUCCESS;
    }
    return status;
  }
};
