"use strict";

var Data = require('model/Data');
var CounterActions = require('actions/CounterActions');
var _ = require('lib/lodash');

var Counter;
Counter = React.createClass({

    getInitialState: function () {
        var counters = Data.getObjectRef('counters');
        var count = counters[this.props.counterId];
        if(!_.isNumber(count)){
            count = 0;
        }
        return {
            count: count
        };
    },

    getDefaultProps: function() {
        return {
            counterId: 'default'
        }
    },

    componentDidMount: function () {
        Data.bind('counters', this.onCounterChange);
    },

    componentWillUnmount: function () {
        Data.unbind('counters', this.onCounterChange);
    },

    inc: function(){
        CounterActions.incrementCounter(this.props.counterId);
    },

    onCounterChange: function (key, value, formerValue) {
        this.setState({
            count: value[this.props.counterId]
        });
    },

    render: function () {
        return (
            <div>
                <div>Compteur {this.props.counterId} : {this.state.count}</div>
                <button onClick={this.inc}>+1</button>
            </div>
        )
    }

});

module.exports = Counter;