var AppDispatcher = require('dispatcher/AppDispatcher');
var MyConstants = require('constants/MyConstants');

var MyActions = {
  increment: function() {
    AppDispatcher.dispatch({
      actionType: MyConstants.INCREMENT
    });
  }

}

module.exports = MyActions;