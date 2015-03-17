var DeleteButton = React.createClass({
    handleClick: function(){
        this.props.onClick();
    },

    render: function(){
        return(
            <button className = "btn waves-effect waves-light red" onClick={this.handleClick}>Delete
                <i className='mdi-action-thumb-down'></i>
            </button>
        )
    }
});