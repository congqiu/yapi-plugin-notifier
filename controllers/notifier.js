const baseController = require('controllers/base.js');
const notifierModel = require('../models/notifier');
const yapi = require('yapi.js');

class notifierController extends baseController {
  constructor(ctx) {
    super(ctx);

    this.notifierModel = yapi.getInst(notifierModel);
  }

  async getNotifiers(ctx) {
    try {
      const projectId = ctx.params.project_id;
      let notifiers = await this.notifierModel.findByProject(projectId)
      ctx.body = yapi.commons.resReturn(notifiers);
    } catch (e) {
      ctx.body = yapi.commons.resReturn(null, 401, e.message);
    }
  }

  async saveNotifier(ctx) {
    let params = ctx.request.body;

    params = yapi.commons.handleParams(params, {
      notifier_name: 'string',
      hook: 'string',
      type: 'string'
    });

    if (!params.notifier_name) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '通知名不能为空'));
    }

    if (!params.hook) {
      return (ctx.body = yapi.commons.resReturn(null, 400, '通知地址不能为空'));
    }

    if (params.type !== "ww") {
      return (ctx.body = yapi.commons.resReturn(null, 400, '通知类型不支持'));
    }

    let checkRepeat = await this.notifierModel.findByName(params.notifier_name, params.project_id);

    if (checkRepeat) {
      return (ctx.body = yapi.commons.resReturn(null, 401, '通知名不能重复'));
    }
    
    try {
      let data = {
        project_id: params.project_id,
        notifier_name: params.notifier_name,
        open: params.open,
        hook: params.hook,
        type: params.type,
        uid: this.getUid()
      }
      let notifier;
      if (params.id) {
        await this.notifierModel.update(params.id, data);
        notifier = await this.notifierModel.find(params.id);
      } else {
        notifier = await this.notifierModel.save(data);
      }
      ctx.body = yapi.commons.resReturn(notifier);
    } catch (e) {
      ctx.body = yapi.commons.resReturn(null, 401, e.message);
    }
  }

  async delNotifier(ctx) {
    try {
      const id = ctx.params.id;

      if (!id) {
        return (ctx.body = yapi.commons.resReturn(null, 400, 'id不能为空'));
      }

      let result = await this.notifierModel.del(id)

      ctx.body = yapi.commons.resReturn(result);
    } catch (e) {
      ctx.body = yapi.commons.resReturn(null, 402, e.message);
    }
    
  }

}

module.exports = notifierController;