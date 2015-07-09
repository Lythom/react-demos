"use strict";

var Menu = require('components/Menu');
var Content1 = require('pages/Content1');
var Content2 = require('pages/Content2');
var Content3 = require('pages/Content3');
var Accueil = require('pages/Accueil');

var App;
App = React.createClass({

    componentDidMount: function () {

    },
    getInitialState: function () {
        this.initApp();
        this.initData();
        return {
            page: 'accueil',
            menuEntries: [
                {link: '#accueil', label: 'Accueil'},
                {link: '#content1', label: 'Contenu 1'},
                {link: '#content2', label: 'Contenu 2'},
                {link: '#content3', label: 'Contenu 3'}
            ]
        };
    },

    initApp: function () {
        React.initializeTouchEvents(true)
    },

    initData: function () {

    },

    entryClicked: function (entry) {
        var page = entry.replace('#','');
        this.setState({
            page: page
        });
    },

    render: function () {

        var content = null;
        if (this.state.page === 'content1') {
            content = <Content1 />
        } else if (this.state.page === 'content2') {
            content = <Content2 />
        } else if (this.state.page === 'content3') {
            content = <Content3 />
        } else {
            content = <Accueil />
        }

        return (
            <div>
                <h1>Demo React seul</h1>

                <Menu entries={this.state.menuEntries} entryClicked={this.entryClicked} selected={this.state.page}/>

                <div className="content">
                    {content}
                </div>
            </div>
        )
    }

});

module.exports = App;