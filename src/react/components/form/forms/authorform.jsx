var AuthorForm = React.createClass({
    // Сброка данных формы в объект и передача его для отправки на сервер
    handleAuthor: function(e){
        e.preventDefault();
        var action = id ? 'Edit' : 'Add';
        var name = React.findDOMNode(this.refs.authorName).value.trim();
        var lastname = React.findDOMNode(this.refs.authorLast).value.trim();
        var fathersname = React.findDOMNode(this.refs.authorFathers).value.trim();
        var company = React.findDOMNode(this.refs.company).value.trim();
        var country = React.findDOMNode(this.refs.country).value.trim();
        var _id=1;
        if (action =='Add') {
            //присваиваем новый целочисленный _id, избегая повторения в случае удаления элементов
            for (var i =0; i <= this.props.authors.length+1 ; i++) {
                this.props.authors.forEach( function(author){
                        if (i!=author._id) {
                            _id = i;
                        }
                    }
                );
            }
        } else {
            _id = this.props.destId;
        }
        var img_url = '';
        if (!name|| !lastname || !company|| !country) return;
        this.props.onSubmit({
            _id: _id,
            name: name,
            lastname: lastname,
            fathersname: fathersname,
            company: company,
            country: country,
            img_url: img_url,
            action: action,
            entity: 'Author'
        });
        React.findDOMNode(this.refs.authorName).value = '';
        React.findDOMNode(this.refs.authorLast).value = '';
        React.findDOMNode(this.refs.authorFathers).value = '';
        React.findDOMNode(this.refs.company).value = '';
        React.findDOMNode(this.refs.country).value = '';
    },
    //Передача на сервер id удаляемого объекта
    handleDelete: function(){
        React.findDOMNode(this.refs.authorName).value = '';
        React.findDOMNode(this.refs.authorLast).value = '';
        React.findDOMNode(this.refs.authorFathers).value = '';
        React.findDOMNode(this.refs.company).value = '';
        React.findDOMNode(this.refs.country).value = '';

        this.props.onSubmit({
            _id: this.props.destId,
            action: 'Delete',
            entity: 'Author'
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
            this.props.authors.forEach(function (author){
                if (id==author._id){
                    React.findDOMNode(self.refs.authorName).value = author.name;
                    React.findDOMNode(self.refs.authorLast).value = author.lastname;
                    React.findDOMNode(self.refs.authorFathers).value = author.fathersname;
                    React.findDOMNode(self.refs.company).value = author.company;
                    React.findDOMNode(self.refs.country).value = author.country;
                }
            });
        } else {

            //Обновляем форму при клике по кнопке Add
            if (this.state.DOMloaded) {
                React.findDOMNode(this.refs.authorName).value = '';
                React.findDOMNode(this.refs.authorLast).value = '';
                React.findDOMNode(this.refs.authorFathers).value = '';
                React.findDOMNode(this.refs.company).value = '';
                React.findDOMNode(this.refs.country).value = '';
            }
        }
        
        return(
            <div className="col s12">
                <form className="col s12" onSubmit={this.handleAuthor}>
                    <div className="row">
                        <div className="input-field col s4">
                            <input id="first_name" type="text" className="validate" ref="authorName"/>
                            <label for="first_name">First Name</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="last_name" type="text" className="validate" ref="authorLast"/>
                            <label for="last_name">Last Name</label>
                        </div>
                        <div className="input-field col s4">
                            <input id="fathers_name" type="text" className="validate" ref="authorFathers"/>
                            <label for="fathers_name">Father's Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="company" type="text" className="validate" ref="company"/>
                            <label for="company">Company Name</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input id="country" type="text" className="validate" ref="country"/>
                            <label for="country">Home Country</label>
                        </div>
                    </div>
                    <div className="file-field input-field col s12">
                        <div className="btn">
                            <span>Photo</span>
                            <input type="file" />
                        </div>
                        <input className="file-path validate" type="text"/>
                    </div>
                    <div className="col s3">
                        <FormButton action={action} />
                    </div>
                    <div className="col s3">
                        { id ? <DeleteButton onClick={this.handleDelete}/> : null}
                    </div>
                </form>
            </div>
        )
    }
});