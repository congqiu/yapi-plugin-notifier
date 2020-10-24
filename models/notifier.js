const yapi = require('yapi.js');
const baseModel = require('models/base.js');

class notifierModel extends baseModel {
  getName() {
    return 'fine_notifier';
  }

  getSchema() {
    return {
      uid: Number,
      // 项目id
      project_id: {
        type: Number,
        required: true
      },

      //是否开启
      open: {
        type: Boolean,
        default: true
      },

      signature: String,

      type: {
        type: String,
        default: "ww",
        enmu: ["ww", "dingding", "webhook"]
      },
      hook: String,

      add_time: Number,
      up_time: Number
    };
  }

  save(data) {
    data.add_time = yapi.commons.time();
    data.up_time = yapi.commons.time();
    let notifier = new this.model(data);
    return notifier.save();
  }

  listAll() {
    return this.model
      .find()
      .sort({ _id: -1 })
      .exec();
  }

  find(id) {
    return this.model.findOne({ _id: id });
  }

  findByName(name) {
    return this.model.findOne({ plan_name: name });
  }

  findByProject(id) {
    return this.model
      .find({
        project_id: id
      })
      .sort({ _id: -1 })
      .exec();
  }

  update(id, data) {
    data.up_time = yapi.commons.time();
    return this.model.update(
      {
        _id: id
      },
      data
    );
  }

  del(id) {
    return this.model.remove({
      _id: id
    });
  }
}

module.exports = notifierModel;