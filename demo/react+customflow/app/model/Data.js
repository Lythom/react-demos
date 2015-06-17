/**
 * @class model/data
 * @function set(key,value)
 * @function get(key)
 * @function bind(key,callback(key,newValue,formerValue))
 * @function unbind(key,callback(key,newValue,formerValue))
 */
"use strict";

var MicroEvent = require('lib/microevent');
var _ = require('lib/lodash');

var dataObject = {
    counters: {},
    ui: {
        page: 'accueil'
    }
};

var Data = {
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
                this.trigger(key, key, value, formerValue);
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
                this.trigger(key, key, value, formerValue);
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
            // if the array was moddified externally we have no way to check. Assume there is always a change.
            // Might return the same object as a formerValue if the same reference was save.
            this.trigger(key, key, value, formerValue);
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
            this.trigger(key, key, value, formerValue);
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
//triggerAll: function (key, newValue, formerValue) {
//    var eventName = key;
//    this.trigger(eventName, eventName, newValue, formerValue);
//    while (eventName.indexOf('.') > -1) {
//        var i = eventName.lastIndexOf('.');
//        eventName = eventName.substring(0, i);
//        this.trigger(eventName, eventName, this.get(eventName));
//    }
//}
    }
    ;


MicroEvent.mixin(Data);

function getNode(tree, key) {
    if(key == '') return tree;
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


/**
 * overrides a using b values
 * @param a
 * @param b
 * @returns {boolean} If a change actually happened to a.
 */
function extend(a, b) {
    var didChange = false;
    for (var key in b) {
        if (b.hasOwnProperty(key) && a[key] !== b[key]) {
            a[key] = b[key];
            console.log(key);
            didChange = true;
        }
    }
    return didChange;
}

module.exports = Data;
