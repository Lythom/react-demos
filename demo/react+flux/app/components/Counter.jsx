"use strict";

var CounterStore = require('stores/CounterStore');
var Actions = require('actions/MyActions');

var Counter;
Counter = React.createClass({

    getInitialState: function () {
        return {
            count: CounterStore.getValue()
        };
    },

    getDefaultProps: function() {
        return {
            counterId: 'default'
        }
    },

    componentDidMount: function () {
        CounterStore.addChangeListener(this.onCounterChange);
    },

    componentWillUnmount: function () {
        CounterStore.removeChangeListener(this.onCounterChange);
    },


    inc: function(){
        Actions.increment();
    },


    onCounterChange: function () {
        this.setState({
            count: CounterStore.getValue()
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