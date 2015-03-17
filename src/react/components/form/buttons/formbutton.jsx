var FormButton = React.createClass({
    render: function(){
        var icon = "mdi-image-brush right";
        if (this.props.action == 'Add') {
            icon = "mdi-content-send right";
        }

        return (
            <button className = "btn waves-effect waves-light" type="submit">{this.props.action}
                <i className={icon}></i>
            </button>
        )
    }
});