"use strict";

var Counter = require('components/Counter');

var Content;
Content = React.createClass({

    componentDidMount: function () {

    },

    componentWillUnmount: function () {

    },


    render: function () {
        return (
            <div>
                <h2>Contenu 1</h2>
                <div>Première page de contenu</div>
                <Counter counterId="content1"/>
            </div>
        )
    }

});

module.exports = Content;