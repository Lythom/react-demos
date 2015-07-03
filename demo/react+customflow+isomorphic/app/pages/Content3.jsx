"use strict";
var React = require('lib/react');

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
                <h2>Contenu 3</h2>
                <div>Troisème page de contenu</div>
                <Counter counterId="content1"/>
                <Counter counterId="content2"/>
            </div>
        )
    }

});

module.exports = Content;