var ThemeForm = React.createClass({
    // Сброка данных формы в объект и передача его для отправки на сервер
    handleTheme: function (e){
        e.preventDefault();
        var action = this.props.destId ? 'Edit' : 'Add';
        var title = React.findDOMNode(this.refs.themeTitle).value.trim();
        var description = React.findDOMNode(this.refs.description).value.trim();
        var _id=1;
        if (action == 'Add') {
            //присваиваем новый целочисленный _id, избегая повторения в случае удаления элементов
            for (var i =0; i <= this.props.themes.length+1 ; i++) {
                this.props.themes.forEach( function(theme){
                        if (i!=theme._id) {
                            _id = i;
                        }
                    }
                );
            }
        } else {
            _id = this.props.destId;
        }
        if (!title) return;
        this.props.onSubmit({
            _id: _id,
            title: title,
            description: description,
            action: action,
            entity: 'Theme'
        });
        React.findDOMNode(this.refs.themeTitle).value = '';
        React.findDOMNode(this.refs.description).value = '';
    },

    handleDelete: function(){
        React.findDOMNode(this.refs.themeTitle).value = '';
        React.findDOMNode(this.refs.description).value = '';

        this.props.onSubmit({
            _id: this.props.destId,
            action: 'Delete',
            entity: 'Theme'
        });
    },

    getInitialState: function(){
        return(
        {
            DOMloaded: false
        }
        )
    },

    componentDidMount: function(){
        this.setState({DOMloaded: true});
    },

    render: function(){
        var id = this.props.destId;
        var action = id ? 'Edit' : 'Add';

        if (id) {
            //Пишем в форму данные из таблицы
            var self = this;
            this.props.themes.forEach(function (theme){
                if (id==theme._id){
                    React.findDOMNode(self.refs.themeTitle).value = theme.title;
                    React.findDOMNode(self.refs.description).value  = theme.description;
                }
            });
        } else {

            //Обновляем форму при клике по кнопке Add
            if (this.state.DOMloaded) {
                React.findDOMNode(this.refs.themeTitle).value = '';
                React.findDOMNode(this.refs.description).value = '';
            }
        }

        return (

            <div className="col s12">

                <form className="col s12" onSubmit={this.handleTheme}>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="title" type="text" className="validate" ref="themeTitle"/>
                            <label for="title">Theme Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea id="description" className="validate materialize-textarea" ref="description"></textarea>
                            <label for="description">Description</label>
                        </div>
                    </div>
                    <div className="col s3">
                        <FormButton
                            action={action}
                        />
                    </div>
                    <div className="col s3">
                        { id ? <DeleteButton onClick={this.handleDelete}/> : null}
                    </div>
                </form>
            </div>
        )
    }
});