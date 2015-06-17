"use strict";

var Content;
Content = React.createClass({

    getInitialState: function () {
        return {
           count: 0
        };
    },

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },

    inc: function() {
        this.setState({
            count: this.state.count + 1
        })
    },

    render: function () {
        return (
            <div>
                <h2>Contenu 2</h2>
                <div>Deuxième page de contenu</div>
                <div>Compteur : {this.state.count}</div>
                <button onClick={this.inc}>+1</button>
            </div>
        )
    }

});

module.exports = Content;