const yapi = require('yapi.js');
const TurndownService = require('turndown');
const notifierModel = require('../models/notifier');
const tools = require('./tools');

class Notifier {
  constructor(message, config) {
    this.message = message;
    this.config = config;

    this.notifierModel = yapi.getInst(notifierModel);
  }

  async send() {
    if (!this.message || !this.message.content || this.message.content.length === 0) {
      yapi.commons.log('yapi-plugin-notifier: 无通知内容');
      return;
    }

    let notifiers = await this.getNotifiers();

    for (let i = 0; i < notifiers.length; i++) {
      await this.sender(notifiers[i], this.dealContent());
    }
  }

  async getNotifiers() {
    return await this.notifierModel.findByProject(this.message.typeid);
  }

  dealContent() {
    const turndownService = new TurndownService();
    const host = this.config.host || "";
    let content = turndownService.turndown(this.message.content);
    try {
      return content.replace(/\]\(\//g, `](${host}/`);
    } catch (error) {
      return content;
    }
  }

  async sender(notifier, content) {
    if (!notifier.open) {
      return;
    }
    content = notifier.signature ? `【${notifier.signature}】${content}` : content;
    switch (notifier.type) {
      case 'ww':
        await tools.sendWWMessage(notifier.hook, content);
        break;
      default:
        yapi.commons.log('yapi-plugin-notifier: 不支持的通知类型' + notifier.type);
        break;
    }
  }
}

module.exports = Notifier;