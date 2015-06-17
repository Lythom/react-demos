"use strict";

var Content;
Content = React.createClass({

    getDefaultProps: function () {
        return {
            entries: []
        };
    },

    render: function () {
        var that = this;

        //var thisEntries = this.props.entries.slice(0).reverse();
        var thisEntries = this.props.entries;

        return (
            <ul className="menu">
                {thisEntries.map(function (item) {
                    return <li key={item.link} className={'#'+that.props.selected === item.link ? 'selected':''}><a href={item.link} onClick={that.props.entryClicked != null ? that.props.entryClicked.bind(null,item.link):null}>{item.label}</a></li>
                })}
            </ul>
        )
    }

});

module.exports = Content;