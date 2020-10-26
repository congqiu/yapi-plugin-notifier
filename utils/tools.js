const axios = require("axios");

exports.sendWWMessage = async (url, content) => {
  return await axios.post(url, {
    "msgtype": "markdown",
    "markdown": {
      content
    }
  });
};

exports.sendDingTalk = async (url, title, text) => {
  return await axios.post(url, {
    "msgtype": "markdown",
    "markdown": {
      title,
      text
    }
  });
};

exports.sendWebhook = async (url, content, data) => {
  return await axios.post(url, {
    data,
    content
  });
};
