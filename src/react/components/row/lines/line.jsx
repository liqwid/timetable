var Line = React.createClass({
    handleClick: function(){
        this.props.onClick('Edit.', this.props.entity, this.props.id);
    },

    render: function(){
        return (
            <p>
                <span
                    className="tooltipped"
                    data-position="right"
                    data-delay="50"
                    data-tooltip="Details/Edit"
                    onClick={this.handleClick}
                >
                    {this.props.value}
                </span>
            </p>
        );
    }

});