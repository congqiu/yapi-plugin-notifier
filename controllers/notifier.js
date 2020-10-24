const baseController = require('controllers/base.js');
const notifierModel = require('../models/notifier');
const yapi = require('yapi.js');

class notifierController extends baseController {
  constructor(ctx) {
    super(ctx);

    this.notifierModel = yapi.getInst(notifierModel);
  }

}

module.exports = notifierController;