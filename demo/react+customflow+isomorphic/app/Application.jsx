"use strict";
var React = require('lib/react');

var Menu = require('components/Menu');
var Content1 = require('pages/Content1');
var Content2 = require('pages/Content2');
var Content3 = require('pages/Content3');
var Accueil = require('pages/Accueil');

var Actions = require('actions/Actions');

var Data = require('model/Data');

var App;
App = React.createClass({

    componentDidMount: function () {
        Data.bind('ui.page', this.onPageChange);
        window.addEventListener('popstate', this.gotoPage);
    },

    componentWillUnmount: function () {
        Data.unbind('ui.page', this.onPageChange);
        window.removeEventListener('popstate', this.gotoPage);
    },

    gotoPage: function(event){
        Actions.gotoPage(event.state, true);
    },

    getInitialState: function () {

        return {
            page: Data.getString('ui.page'),
            menuEntries: [
                {link: 'page-accueil', label: 'Accueil'},
                {link: 'page-content1', label: 'Contenu 1'},
                {link: 'page-content2', label: 'Contenu 2'},
                {link: 'page-content3', label: 'Contenu 3'}
            ]
        };
    },

    onPageChange: function(key, page, previousPage){
        this.setState({
           page: page
        });
    },

    entryClicked: function (entry, e) {
        if(e != null) e.preventDefault();
        Actions.gotoPage(entry);
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
                <h1>Demo React + Custom flow</h1>

                <Menu entries={this.state.menuEntries} entryClicked={this.entryClicked} selected={this.state.page}/>

                <div className="content">
                    {content}
                </div>
            </div>
        )
    }

});

module.exports = App;