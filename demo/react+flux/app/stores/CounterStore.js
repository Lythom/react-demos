var AppDispatcher = require('dispatcher/AppDispatcher');
var EventEmitter = EventEmitter2;
var server = new EventEmitter2();
var MyConstants = require('constants/MyConstants');

var CHANGE_EVENT = 'change';

var _counter = 0;

function increment() {
    _counter = _counter + 1;
}



var CounterStore = {
    emitChange: function() {
        server.emit(CHANGE_EVENT);
    },

    getValue: function() {
        return _counter;
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        server.on(CHANGE_EVENT, callback);
    },

    /**
   * @param {function} callback
   */
    removeChangeListener: function(callback) {
        server.removeListener(CHANGE_EVENT, callback);
    }
};



// Register callback to handle all updates
AppDispatcher.register(function(action) {
    switch(action.actionType) {
        case MyConstants.INCREMENT:
            increment();
            CounterStore.emitChange();
            break;
        default:
    }
});

module.exports = CounterStore;
