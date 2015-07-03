var Data = require('model/Data');
var _ = require('lib/lodash');
var $ = require('lib/jquery');

var Actions = {
    isServer: false,
    incrementCounter: function (counterId) {
        // send action to server
        if (!this.isServer) {
            $.ajax({
                method: "POST",
                url: '/do-increment',
                error: function (jqXHR, status, error) {
                    Data.setString('net.lastError', status);
                    console.error(error);
                },
                data: {
                    counterId: counterId
                }
            });
        }

        // optimistic render of the result
        var counters = Data.getObjectRef('counters');
        var count = counters[counterId];
        if (!_.isNumber(count)) {
            counters[counterId] = 1;
        } else {
            counters[counterId] = count + 1;
        }
        Data.setObjectRef('counters', counters);
    },

    gotoPage: function (page, skipHistory) {
        // send action to server
        if (!this.isServer) {
            if(!skipHistory){
                window.history.pushState(page,'', page);
            }
            $.ajax({
                method: "POST",
                url: '/page-' + page,
                error: function (jqXHR, status, error) {
                    Data.setString('net.lastError', status);
                    console.error(error);
                },
                data: {
                        page: page
                    }
            });
        }

        // optimistic render of the result
        Data.setString('ui.page', page.replace('page-', ''));
    }
};

module.exports = Actions;