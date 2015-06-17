"use strict";
var Data = require('model/Data');
var _ = require('lib/lodash');

var lastErrorTO = null;
var UIActions = {
    gotoP: function (screenName) {
        Data.setString('ui.currentScreen', screenName);
    },
    gotoPanel: function (panelName) {
        Data.setString('ui.craftingScreen.currentPanel', panelName);
    },
    dragRune: function (rune) {
        Data.setObjectRef('ui.craftingScreen.draggingRune', rune);
    },
    /**
     * Set mouse Position in data model
     * @param {{x,y}} position
     */
    setMousePosition: function (position) {
        Data.setObjectRef('ui.mouse.position', position);
    },

    setAppOffset: function (position) {
        Data.setObjectRef('ui.appOffset', position);
    },

    overCell: function (runeCell) {
        Data.setObjectRef('ui.craftingScreen.overCell', runeCell);
    },

    sendError: function (errorMsg) {
        if (_.isString(errorMsg)) {
            Data.setString('ui.errorFeedback', errorMsg);
            clearTimeout(lastErrorTO);
            lastErrorTO = setTimeout(function () {
                Data.setString('ui.errorFeedback', null);
            }, 2000);
        } else if(errorMsg === true) {
            clearTimeout(lastErrorTO);
            Data.setString('ui.errorFeedback', null);
        }
    }
}

module.exports = UIActions;