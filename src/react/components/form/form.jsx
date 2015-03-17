var Form = React.createClass({

    handleForm: function(e){
        // Сброка данных формы в объект и передача его для отправки на сервер
        e.preventDefault();

        var action = this.props.task.split('.')[0];
        var _id=1;

        switch (this.props.entity){
            case 'Lecture':

                //Собираем данные из формы
                var title = React.findDOMNode(this.refs.lectureTitle).value.trim();
                var parts = React.findDOMNode(this.refs.date).value.trim().split('.');
                var start = new Date(
                    2015,
                    parts[0],
                    parts[1],
                    React.findDOMNode(this.refs.startHour).value,
                    React.findDOMNode(this.refs.startMinutes).value
                );
                var finish = new Date(
                    2015,
                    parts[0],
                    parts[1],
                    React.findDOMNode(this.refs.finishHour).value,
                    React.findDOMNode(this.refs.finishMinutes).value
                );
                var author_id = [React.findDOMNode(this.refs.lectureAuthor).value];
                var theme_id = [React.findDOMNode(this.refs.lectureTheme).value];
                if (action == 'Add') {
                    //присваиваем новый целочисленный _id, избегая повторения в случае удаления элементов
                    for (var i =0; i <= this.props.lectures.length+1 ; i++) {
                        this.props.lectures.forEach( function(lecture){
                                if (i!=lecture._id) {
                                    _id = i;
                                }
                            }
                        );
                    }
                } else {
                    _id = this.props.task.split('.')[1];
                }
                if (!title) return;

                //Передаем данные в коллбэк
                this.props.onSubmit({
                    _id: _id,
                    author_id: author_id,
                    theme_id: theme_id,
                    title: title,
                    start: start,
                    finish: finish,
                    action: action,
                    entity: 'Lecture'
                });


                //Обновляем форму
                React.findDOMNode(this.refs.lectureTitle).value = '';
                React.findDOMNode(this.refs.lectureAuthor).defaultValue = 1;
                React.findDOMNode(this.refs.lectureTheme).defaultValue = 1;
                React.findDOMNode(this.refs.date).value = '';
                React.findDOMNode(this.refs.startHour).value = 12;
                React.findDOMNode(this.refs.startMinutes).value = 30;
                React.findDOMNode(this.refs.finishHour).value = 12;
                React.findDOMNode(this.refs.finishMinutes).value = 30;

                break;


            case 'Author':
                //Собираем данные из формы
                var name = React.findDOMNode(this.refs.authorName).value.trim();
                var lastname = React.findDOMNode(this.refs.authorLast).value.trim();
                var fathersname = React.findDOMNode(this.refs.authorFathers).value.trim();
                var company = React.findDOMNode(this.refs.company).value.trim();
                var country = React.findDOMNode(this.refs.country).value.trim();
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
                    _id = this.props.task.split('.')[1];
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

                break;


            case 'Theme':

                var titleTheme = React.findDOMNode(this.refs.themeTitle).value.trim();
                var description = React.findDOMNode(this.refs.description).value.trim();
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
                    _id = this.props.task.split('.')[1];
                }
                if (!titleTheme) return;
                this.props.onSubmit({
                    _id: _id,
                    title: titleTheme,
                    description: description,
                    action: action,
                    entity: 'Theme'
                });
                React.findDOMNode(this.refs.themeTitle).value = '';
                React.findDOMNode(this.refs.description).value = '';

                break;
        }
    },

    handleDelete: function(){


        switch(this.props.entity){

            case 'Lecture':
                React.findDOMNode(this.refs.lectureTitle).value = '';
                React.findDOMNode(this.refs.lectureAuthor).defaultValue = 1;
                React.findDOMNode(this.refs.lectureTheme).defaultValue = 1;
                React.findDOMNode(this.refs.date).value = '';
                React.findDOMNode(this.refs.startHour).value = 12;
                React.findDOMNode(this.refs.startMinutes).value = 30;
                React.findDOMNode(this.refs.finishHour).value = 12;
                React.findDOMNode(this.refs.finishMinutes).value = 30;
                break;

            case 'Author':
                React.findDOMNode(this.refs.authorName).value = '';
                React.findDOMNode(this.refs.authorLast).value = '';
                React.findDOMNode(this.refs.authorFathers).value = '';
                React.findDOMNode(this.refs.company).value = '';
                React.findDOMNode(this.refs.country).value = '';

            case 'Theme':
                React.findDOMNode(this.refs.themeTitle).value = '';
                React.findDOMNode(this.refs.description).value = '';
                break;
        }


        this.props.onSubmit({
            _id: this.props.task.split('.')[1],
            action: 'Delete',
            entity: this.props.entity
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

    handleChange: function(){
        this.setState({DOMloaded: false});
    },

    render: function(){

        if (this.props.entity=='Lecture') {
            //Заполняем селекты
            var themeOptions = [];
            var authorOptions = [];

            this.props.authors.forEach( function(author) {
                authorOptions.push(
                    <option value = {author._id}>
                                {author.lastname} {author.name}
                    </option>
                );
            });

            this.props.themes.forEach( function(theme) {
                themeOptions.push(
                    <option value = {theme._id}>
                                {theme.title}
                    </option>
                );
            });
            //Функция добавки 0 к датам и времени
            function addZero(i) {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        }
        
        var action = this.props.task.split('.')[0];
        var id = this.props.task.split('.')[1];

        if (id) {
            //Пишем в форму данные из таблицы
            var self = this;
            switch (this.props.entity) {

                case 'Lecture':
                    this.props.lectures.forEach(function (lecture) {
                        if (id == lecture._id) {
                            var starttime = new Date(lecture.start);
                            var finishtime = new Date(lecture.finish);
                            React.findDOMNode(self.refs.lectureTitle).value = lecture.title;
                            React.findDOMNode(self.refs.lectureAuthor).defaultValue = lecture.author_id[0];
                            React.findDOMNode(self.refs.lectureTheme).defaultValue = lecture.theme_id[0];
                            React.findDOMNode(self.refs.date).value = addZero(starttime.getMonth()) + '.' + addZero(starttime.getDate());
                            React.findDOMNode(self.refs.startHour).value = addZero(starttime.getHours());
                            React.findDOMNode(self.refs.startMinutes).value = addZero(starttime.getMinutes());
                            React.findDOMNode(self.refs.finishHour).value = addZero(finishtime.getHours());
                            React.findDOMNode(self.refs.finishMinutes).value = addZero(finishtime.getMinutes());
                        }
                    });
                    break;

                case 'Author':
                    this.props.authors.forEach(function (author) {
                        if (id == author._id) {
                            React.findDOMNode(self.refs.authorName).value = author.name;
                            React.findDOMNode(self.refs.authorLast).value = author.lastname;
                            React.findDOMNode(self.refs.authorFathers).value = author.fathersname;
                            React.findDOMNode(self.refs.company).value = author.company;
                            React.findDOMNode(self.refs.country).value = author.country;
                        }
                    });
                    break;

                case 'Theme':
                    this.props.themes.forEach(function (theme) {
                        if (id == theme._id) {
                            React.findDOMNode(self.refs.themeTitle).value = theme.title;
                            React.findDOMNode(self.refs.description).value = theme.description;
                        }
                    });
                    break;
            }
        } else {

            //Обновляем форму при клике по кнопке Add

            if (this.state.DOMloaded) {
                switch (this.props.entity) {

                    case 'Lecture':
                        React.findDOMNode(this.refs.lectureTitle).value = '';
                        React.findDOMNode(this.refs.lectureAuthor).defaultValue = 1;
                        React.findDOMNode(this.refs.lectureTheme).defaultValue = 1;
                        React.findDOMNode(this.refs.date).value = '';
                        React.findDOMNode(this.refs.startHour).value = 12;
                        React.findDOMNode(this.refs.startMinutes).value = 30;
                        React.findDOMNode(this.refs.finishHour).value = 12;
                        React.findDOMNode(this.refs.finishMinutes).value = 30;
                        break;

                    case 'Author':
                        React.findDOMNode(this.refs.authorName).value = '';
                        React.findDOMNode(this.refs.authorLast).value = '';
                        React.findDOMNode(this.refs.authorFathers).value = '';
                        React.findDOMNode(this.refs.company).value = '';
                        React.findDOMNode(this.refs.country).value = '';
                        break;


                    case 'Theme':
                        React.findDOMNode(this.refs.themeTitle).value = '';
                        React.findDOMNode(this.refs.description).value = '';
                        break;
                }
            }
        }

        
        switch(this.props.entity) {


            case 'Lecture':
                return (
                    <div className="col s12" onChange = {this.handleChange}>
                        <form className="col s12" onSubmit={this.handleForm}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="title" type="text" className="validate" ref="lectureTitle"/>
                                    <label for="title">Lecture Title</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s2">
                                    <label>Date</label>
                                    <input type="date" className="datepicker" ref="date"/>
                                </div>
                                <div className="col s2">
                                    <label>Start time: hours</label>
                                    <p className="range-field">
                                        <input type="range" min="0" max="23" ref="startHour"/>
                                    </p>
                                </div>
                                <div className="col s3">
                                    <label>Start time: minutes</label>
                                    <p className="range-field">
                                        <input type="range" ref="startMinutes" min="0" max="59"/>
                                    </p>
                                </div>
                                <div className="col s2">
                                    <label>Finish time: hours</label>
                                    <p className="range-field">
                                        <input type="range" ref="finishHour" min="0" max="23"/>
                                    </p>
                                </div>
                                <div className="col s3">
                                    <label>Finish time: minutes</label>
                                    <p className="range-field">
                                        <input type="range" ref="finishMinutes" min="0" max="59"/>
                                    </p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s3">
                                    <label>Select Author</label>
                                    <select className="browser-default" ref="lectureAuthor">
                                    {authorOptions}
                                    </select>
                                </div>
                                <div className="col s3">
                                    <label>Select Theme</label>
                                    <select className="browser-default" ref="lectureTheme">
                                    {themeOptions}
                                    </select>
                                </div>
                                <div className="col s3">
                                    <FormButton action = {action} />
                                </div>
                                <div className="col s3">
                            {id ? <DeleteButton onClick={this.handleDelete}/> : null}
                                </div>
                            </div>
                        </form>
                    </div>
                );
                break;

            case 'Author':
                return(
                    <div className="col s12" onChange = {this.handleChange}>
                        <form className="col s12" onSubmit={this.handleForm}>
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
                );
                break;

            case 'Theme':
                return(
                    <div className="col s12" onChange={this.handleChange}>

                        <form className="col s12" onSubmit={this.handleForm}>
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
                );
                break;
        }
    }    
});