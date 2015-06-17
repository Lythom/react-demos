"use strict";

var CounterStore = require('stores/CounterStore');
var CounterActions = require('actions/CounterActions');

var Counter;
Counter = React.createClass({

    getInitialState: function () {
        return {
            count: CounterStore.getValue(this.props.counterId)
        };
    },

    getDefaultProps: function() {
        return {
            counterId: 'default'
        }
    },

    componentDidMount: function () {
        this.unsubscribe = CounterStore.listen(this.onCounterChange);
    },

    componentWillUnmount: function () {
        this.unsubscribe();
    },

    inc: function(){
        CounterActions.incrementCounter(this.props.counterId);
    },

    onCounterChange: function (value) {
        this.setState({
            count: value
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