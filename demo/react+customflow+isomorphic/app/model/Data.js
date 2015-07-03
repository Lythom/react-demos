/**
 * @class model/data
 * @function set(key,value)
 * @function get(key)
 * @function bind(key,callback(key,newValue,formerValue))
 * @function unbind(key,callback(key,newValue,formerValue))
 */
"use strict";

var MicroEvent = require('../lib/microevent');
var _ = require('../lib/lodash');

var dataObject = {
    counters: {},
    ui: {
        page: 'accueil'
    },
    net: {
        lastError: ''
    }
};
var Data = {

    setInitialState : function(state) {
        dataObject = state;
    },

    getDefaultInitialState : function() {
        return dataObject;
    },

    /**
     * Register a string at the specified node key
     * @param key
     * @param value
     */
    setString: function (key, value) {
        if (value != null && !_.isString(value)) {
            throw new Error('value is not a string or null');
        }
        var formerValue = this.getString(key);
        var didChange = setNode(dataObject, key, value);
        if (didChange) {
            registerTrigger(key, value, formerValue);
        }
    },
    /**
     * Register a number at the specified node key
     * @param key
     * @param value
     */
    setNumber: function (key, value) {
        if (value != null && !_.isNumber(value)) {
            throw new Error('value is not a number or null');
        }
        var formerValue = this.getNumber(key);
        var didChange = setNode(dataObject, key, value);
        if (didChange) {
            registerTrigger(key, value, formerValue);
        }
    },
    /**
     * Register an array at the specified node key
     * @param key
     * @param value
     */
    setArray: function (key, value) {
        if (value != null && !_.isArray(value)) {
            throw new Error('value is not an array or null');
        }
        var formerValue = this.getArray(key);
        setNode(dataObject, key, value, true);
        // if the array was moddified externally we have no way to check. Assume there is always a change.
        // Might return the same object as a formerValue if the same reference was save.
        registerTrigger(key, value, formerValue, true);
    },
    /**
     * Register an object reference at the specified node key
     * @param key
     * @param value
     */
    setObjectRef: function (key, value) {
        if (value != null && !_.isObject(value)) {
            throw new Error('value is not an object or null');
        }
        var formerValue = this.getObjectRef(key);
        setNode(dataObject, key, value, true);
        // if the instance was moddified externally we have no way to check. Assume there is always a change.
        // Might return the same object as a formerValue if the same reference was save.
        registerTrigger(key, value, formerValue, true)
    },
    /**
     * Get a copy of the data string.
     * @param key
     * @returns {String}
     */
    getString: function (key) {
        if (key !== null && key !== undefined && key !== '') {
            var node = getNode(dataObject, key);
            if (node != null && !_.isString(node)) {
                throw new Error('key ' + key + ' is not pointing at a string');
            }
            return node;
        }
        return dataObject;
    },
    getNumber: function (key) {
        if (key !== null && key !== undefined && key !== '') {
            var node = getNode(dataObject, key);
            if (node != null && !_.isNumber(node)) {
                throw new Error('key ' + key + ' is not pointing at a number');
            }
            return node;
        }
        return dataObject;
    },
    getArray: function (key) {
        if (key !== null && key !== undefined && key !== '') {
            var node = getNode(dataObject, key);
            if (node != null && !_.isArray(node)) {
                throw new Error('key ' + key + ' is not pointing at an array');
            }
            return node;
        }
        return dataObject;
    },
    getObjectRef: function (key) {
        if (key !== null && key !== undefined && key !== '') {
            var node = getNode(dataObject, key);
            if (node != null && !_.isObject(node)) {
                throw new Error('key ' + key + ' is not pointing at an object');
            }
            return node;
        }
        return dataObject;
    }
};

MicroEvent.mixin(Data);

function getNode(tree, key) {
    var keyList = key.split('.');
    var node = tree;
    for (var i = 0; i < keyList.length; i++) {
        node = node[keyList[i]];
        if (node === undefined) {
            throw new Error('no data at ' + key + ' (node ' + keyList[i] + ' does\'nt exists.');
        }
    }
    return node;
}

/**
 * @function Set a data node at key with value.
 * @return {Boolean} true if node was modified.
 */
function setNode(tree, key, value, force) {
    var didChange = false;
    var keyList = key.split('.');
    var node = tree;
    var i = 0;
    for (; i < keyList.length - 1; i++) {
        node = node[keyList[i]];
        if (node === undefined) {
            throw new Error('no data at ' + key + ' (node ' + keyList[i] + ' does\'nt exists.');
        }
    }

    if (force || !_.isEqual(node[keyList[i]], value)) {
        node[keyList[i]] = value;
        didChange = true;
    }

    return didChange;
}


// memorize previous states
var dataHistory = [];

// next data changes batch to be applied
var previousTree = null;
var batchTimeout = null;
var batchOperations = {};

function triggerBatch() {
    // diff
    var c = 0;
    var s = 0;
    var triggering = batchOperations;
    batchOperations = {};
    for (var prop in triggering) {
        if (triggering.hasOwnProperty(prop)) {
            var obj = triggering[prop];
            // last check, maybe the value got back to it's initial value
            if (obj.force || obj.oldValue !== obj.newValue) {
                Data.trigger(obj.key, obj.key, obj.newValue, obj.oldValue);
                c++;
            } else {
                s++;
            }
        }
    }

    // reset batch
    previousTree = null;
    batchTimeout = null;

}
function registerTrigger(key, newValue, oldValue, force) {

    // add operation to be triggered
    if (batchOperations[key] === undefined) {
        batchOperations[key] = {
            key: key,
            newValue: newValue,
            oldValue: oldValue,
            force: force
        };
    } else {
        batchOperations[key].newValue = newValue;
    }

    if(typeof window !== 'undefined') {
        if (batchTimeout != null) {
            console.log('cancelling');
            window.cancelAnimationFrame(batchTimeout);
        }
        batchTimeout = window.requestAnimationFrame(triggerBatch);
    }
}


module.exports = Data;
