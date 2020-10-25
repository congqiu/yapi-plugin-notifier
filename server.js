const yapi =require('yapi.js');
const notifier = require('./controllers/notifier');

module.exports = function(options){
  const originalSaveLog = this.commons.saveLog;

  this.commons.saveLog = function() {
    const args = Array.prototype.slice.call(arguments);
    originalSaveLog.apply(this, args);

    try {
      yapi.commons.log('yapi-plugin-notifier: 开始运行');
      const logData = args[0];
      if (!logData || logData.type != 'project') {
        return;
      }
    } catch(err) {
      yapi.commons.log(err, 'error');
    }
  }

  this.bindHook('add_router', function(addRouter){
    addRouter({
      controller: notifier,
      method: 'get',
      path: 'fine/notifier',
      action: 'getNotifiers'
    });
    addRouter({
      controller: notifier,
      method: 'post',
      path: 'fine/notifier/save',
      action: 'saveNotifier'
    });
    addRouter({
      controller: notifier,
      method: 'post',
      path: 'fine/notifier/del',
      action: 'delNotifier'
    });
  });
}