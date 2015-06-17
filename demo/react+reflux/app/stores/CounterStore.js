var Actions = require('actions/Actions');

// fake database
var counterValues = {};

var CounterStore = Reflux.createStore({
    // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
    init: function() {
        this.listenTo(Actions.incrementCounter, this.onIncrementCounter);
    },
    onIncrementCounter: function(counterKey, value) {
        var foundItem = counterValues[counterKey];
        if (foundItem != null) {
            counterValues[counterKey] += 1;
        } else {
            counterValues[counterKey] = 1;
        }
        this.trigger(counterValues[counterKey]);
    },
    getValue: function(counterKey) {
        var foundItem = counterValues[counterKey];
        if (foundItem != null) {
            return foundItem;
        } else {
            return 0;
        }
    }
});

module.exports = CounterStore;