var Data = require('model/Data');
var _ = require('lib/lodash');

var Actions = {
    incrementCounter: function(counterId){
        var counters = Data.getObjectRef('counters');
        var count = counters[counterId];
        if(!_.isNumber(count)){
            counters[counterId] = 1;
        } else {
            counters[counterId] = count + 1
        }
        Data.setObjectRef('counters', counters);
    }
}

module.exports = Actions;