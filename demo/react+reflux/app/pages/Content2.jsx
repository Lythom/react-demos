"use strict";

var Counter = require('components/Counter');

var Content;
Content = React.createClass({

    render: function () {
        return (
            <div>
                <h2>Contenu 2</h2>
                <div>Deuxième page de contenu</div>
                <Counter counterId="content2"/>
            </div>
        )
    }

});

module.exports = Content;