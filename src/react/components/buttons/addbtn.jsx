//Элемент: кнопки добавления автора/темы/лекции
var AddBtn = React.createClass({
    handleClick: function(){
        this.props.onClick('Add', this.props.entity, null);
    },
    render: function(){
        return (
            <span
                className="new badge waves-effect waves-light tooltipped"
                data-position="left"
                data-delay="50"
                data-tooltip={"Add New " + this.props.entity}
                onClick={this.handleClick}
            >
            <i className="mdi-content-add"></i>
            </span>
        )
    }
});