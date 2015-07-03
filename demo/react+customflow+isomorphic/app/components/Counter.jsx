"use strict";

var React = require('lib/react');
var Data = require('model/Data');
var Actions = require('actions/Actions');
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

    inc: function(e){
        if(e != null){
            e.preventDefault();
        }
        Actions.incrementCounter(this.props.counterId);
    },

    onCounterChange: function (key, value, formerValue) {
        if(value[this.props.counterId] != null) {
            this.setState({
                count: value[this.props.counterId]
            });
        }
    },

    render: function () {
        return (
            <div>
                <div>Compteur {this.props.counterId} : {this.state.count}</div>
                <a href={'/do-increment?counterId='+this.props.counterId} onClick={this.inc}>+1</a>
            </div>
        )
    }

});

module.exports = Counter;