"use strict";

var CounterStore = require('stores/CounterStore');
var Actions = require('actions/Actions');

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
        this.unsubscribeonCounterChange = CounterStore.listen(this.onCounterChange);
    },

    componentWillUnmount: function () {
        this.unsubscribeonCounterChange();
    },

    inc: function(){
        Actions.incrementCounter(this.props.counterId);
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