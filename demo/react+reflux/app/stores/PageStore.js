var Actions = require('actions/Actions');

// fake database
var pageStore = 'accueil';

PageStore = Reflux.createStore({
    // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
    init: function() {
        this.listenTo(Actions.gotoPage, this.onGotoPage);
    },
    onGotoPage: function(page) {
        pageStore = page.replace('#','');
        this.trigger(pageStore);
    },
    getValue: function() {
        return pageStore;
    }
});

module.exports = PageStore;