"use strict";

var Menu = require('components/Menu');
var Content1 = require('pages/Content1');
var Content2 = require('pages/Content2');
var Content3 = require('pages/Content3');
var Accueil = require('pages/Accueil');

var Actions = require('./actions/Actions');
var PageStore = require('stores/PageStore');

var App;
App = React.createClass({

    componentDidMount: function () {
        this.unsubscribeonPageChange = PageStore.listen(this.onPageChange);
    },

    componentWillUnmount: function () {
        this.unsubscribeonPageChange();
    },

    getInitialState: function () {
        this.initApp();
        this.initData();
        return {
            page: PageStore.getValue(),
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
        // here load data from external source if needed
    },

    onPageChange: function(page){
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
                <h1>Demo React + Reflux</h1>

                <Menu entries={this.state.menuEntries} entryClicked={Actions.gotoPage} selected={this.state.page}/>

                <div className="content">
                    {content}
                </div>
            </div>
        )
    }

});

module.exports = App;