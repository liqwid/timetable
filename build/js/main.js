//Подключаем элементы реакта с помощью gulp-rigger

var Line = React.createClass({displayName: "Line",
    handleClick: function(){
        this.props.onClick('Edit.', this.props.entity, this.props.id);
    },

    render: function(){
        return (
            React.createElement("p", null, 
                React.createElement("span", {
                    className: "tooltipped", 
                    "data-position": "right", 
                    "data-delay": "50", 
                    "data-tooltip": "Details/Edit", 
                    onClick: this.handleClick
                }, 
                    this.props.value
                )
            )
        );
    }

});
//Элемент: ряд таблицы
var Row = React.createClass({displayName: "Row",
    render: function() {
        var self = this;

        //Внутри таблицы на новой строчке отображается новый автор, создаем элемент Author и передаем в него id и запись для таблицы
        var authorlines = [];

        this.props.authors.forEach(function(author){

            var value = author.lastname + ' ' + author.name;

            authorlines.push(React.createElement(Line, {
                entity: "Author", 
                id: author._id, 
                value: value, 
                onClick: self.props.onClick}
            ))
        });

        //Внутри таблицы на новой строчке отображается новая тема, создаем элемент Theme и передаем в него id и запись для таблицы
        var themelines = [];
        this.props.themes.forEach(function(theme){
            themelines.push(React.createElement(Line, {
                entity: "Theme", 
                id: theme._id, 
                value: theme.title, 
                onClick: self.props.onClick}
            ))
        });
        //Функция добавления нуля к часам и минутам
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        var starttime = new Date(this.props.lecture.start);

        var finishtime = new Date(this.props.lecture.finish);

        var timeval =
            + addZero(starttime.getDate())
            + '.'
            + addZero(starttime.getMonth())
            + ' '
            + addZero(starttime.getHours())
            + ':'
            + addZero(starttime.getMinutes())
            + '-'
            + addZero(finishtime.getHours())
            + ':'
            + addZero(finishtime.getMinutes());

        return (
            React.createElement("tr", null, 
                React.createElement("td", null, authorlines), 
                React.createElement("td", null, themelines), 
                React.createElement("td", null, React.createElement(Line, {
                    entity: "Lecture", 
                    onClick: this.props.onClick, 
                    value: this.props.lecture.title, 
                    id: this.props.lecture._id}
                )), 
                React.createElement("td", null, React.createElement(Line, {
                    entity: "Lecture", 
                    onClick: this.props.onClick, 
                    value: timeval, 
                    id: this.props.lecture._id}
                ))
            )
        );
    }
});

//Элемент: кнопки добавления автора/темы/лекции
var AddBtn = React.createClass({displayName: "AddBtn",
    handleClick: function(){
        this.props.onClick('Add', this.props.entity, null);
    },
    render: function(){
        return (
            React.createElement("span", {
                className: "new badge waves-effect waves-light tooltipped", 
                "data-position": "left", 
                "data-delay": "50", 
                "data-tooltip": "Add New " + this.props.entity, 
                onClick: this.handleClick
            }, 
            React.createElement("i", {className: "mdi-content-add"})
            )
        )
    }
});

var FormButton = React.createClass({displayName: "FormButton",
    render: function(){
        var icon = "mdi-image-brush right";
        if (this.props.action == 'Add') {
            icon = "mdi-content-send right";
        }

        return (
            React.createElement("button", {className: "btn waves-effect waves-light", type: "submit"}, this.props.action, 
                React.createElement("i", {className: icon})
            )
        )
    }
});
var DeleteButton = React.createClass({displayName: "DeleteButton",
    handleClick: function(){
        this.props.onClick();
    },

    render: function(){
        return(
            React.createElement("button", {className: "btn waves-effect waves-light red", onClick: this.handleClick}, "Delete", 
                React.createElement("i", {className: "mdi-action-thumb-down"})
            )
        )
    }
});
var AuthorForm = React.createClass({displayName: "AuthorForm",
    // Сброка данных формы в объект и передача его для отправки на сервер
    handleAuthor: function(e){
        e.preventDefault();
        var action = this.props.destId ? 'Edit' : 'Add';
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
            React.createElement("div", {className: "col s12"}, 
                React.createElement("form", {className: "col s12", onSubmit: this.handleAuthor}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s4"}, 
                            React.createElement("input", {id: "first_name", type: "text", className: "validate", ref: "authorName"}), 
                            React.createElement("label", {for: "first_name"}, "First Name")
                        ), 
                        React.createElement("div", {className: "input-field col s4"}, 
                            React.createElement("input", {id: "last_name", type: "text", className: "validate", ref: "authorLast"}), 
                            React.createElement("label", {for: "last_name"}, "Last Name")
                        ), 
                        React.createElement("div", {className: "input-field col s4"}, 
                            React.createElement("input", {id: "fathers_name", type: "text", className: "validate", ref: "authorFathers"}), 
                            React.createElement("label", {for: "fathers_name"}, "Father's Name")
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s12"}, 
                            React.createElement("input", {id: "company", type: "text", className: "validate", ref: "company"}), 
                            React.createElement("label", {for: "company"}, "Company Name")
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s12"}, 
                            React.createElement("input", {id: "country", type: "text", className: "validate", ref: "country"}), 
                            React.createElement("label", {for: "country"}, "Home Country")
                        )
                    ), 
                    React.createElement("div", {className: "file-field input-field col s12"}, 
                        React.createElement("div", {className: "btn"}, 
                            React.createElement("span", null, "Photo"), 
                            React.createElement("input", {type: "file"})
                        ), 
                        React.createElement("input", {className: "file-path validate", type: "text"})
                    ), 
                    React.createElement("div", {className: "col s3"}, 
                        React.createElement(FormButton, {action: action})
                    ), 
                    React.createElement("div", {className: "col s3"}, 
                         id ? React.createElement(DeleteButton, {onClick: this.handleDelete}) : null
                    )
                )
            )
        )
    }
});
var LectureForm = React.createClass({displayName: "LectureForm",

    handleLecture: function(e){
        // Сброка данных формы в объект и передача его для отправки на сервер
        e.preventDefault();
        var action = this.props.destId ? 'Edit' : 'Add';
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
        var _id=1;
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
            _id = this.props.destId;
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
    },

    handleDelete: function(){

        React.findDOMNode(this.refs.lectureTitle).value = '';
        React.findDOMNode(this.refs.lectureAuthor).defaultValue = 1;
        React.findDOMNode(this.refs.lectureTheme).defaultValue = 1;
        React.findDOMNode(this.refs.date).value = '';
        React.findDOMNode(this.refs.startHour).value = 12;
        React.findDOMNode(this.refs.startMinutes).value = 30;
        React.findDOMNode(this.refs.finishHour).value = 12;
        React.findDOMNode(this.refs.finishMinutes).value = 30;

        this.props.onSubmit({
            _id: this.props.destId,
            action: 'Delete',
            entity: 'Lecture'
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

        //Заполняем селекты
        var themeOptions = [];
        var authorOptions = [];

        this.props.authors.forEach( function(author) {
            authorOptions.push(
                React.createElement("option", {value: author._id}, 
                                author.lastname, " ", author.name
                )
            );
        });

        this.props.themes.forEach( function(theme) {
            themeOptions.push(
                React.createElement("option", {value: theme._id}, 
                                theme.title
                )
            );
        });
        //Функция добавки 0 к датам и времени
        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }


        //Проверяем это edit или add форма
        var id = this.props.destId;
        var action = id ? 'Edit' : 'Add';

        if (id) {

            //Пишем в форму данные из таблицы
            var self = this;
            this.props.lectures.forEach(function (lecture){
                if (id==lecture._id){
                    var starttime  = new Date(lecture.start);
                    var finishtime = new Date(lecture.finish);
                    React.findDOMNode(self.refs.lectureTitle).value = lecture.title;
                    React.findDOMNode(self.refs.lectureAuthor).defaultValue = lecture.author_id[0];
                    React.findDOMNode(self.refs.lectureTheme).defaultValue = lecture.theme_id[0];
                    React.findDOMNode(self.refs.date).value = addZero(starttime.getMonth()) + '.' + addZero(starttime.getDate());
                    React.findDOMNode(self.refs.startHour).value = addZero(starttime.getHours());
                    React.findDOMNode(self.refs.startMinutes).value = addZero(starttime.getMinutes());
                    React.findDOMNode(self.refs.finishHour).value = addZero(finishtime.getHours());
                    React.findDOMNode(self.refs.finishMinutes).value  = addZero(finishtime.getMinutes());
                }
            });
        } else {

            //Обновляем форму при клике по кнопке Add
            if (this.state.DOMloaded) {
                React.findDOMNode(this.refs.lectureTitle).value = '';
                React.findDOMNode(this.refs.lectureAuthor).defaultValue = 1;
                React.findDOMNode(this.refs.lectureTheme).defaultValue = 1;
                React.findDOMNode(this.refs.date).value = '';
                React.findDOMNode(this.refs.startHour).value = 12;
                React.findDOMNode(this.refs.startMinutes).value = 30;
                React.findDOMNode(this.refs.finishHour).value = 12;
                React.findDOMNode(this.refs.finishMinutes).value = 30;
            }
        }

        return (
            React.createElement("div", {className: "col s12"}, 
                    React.createElement("form", {className: "col s12", onSubmit: this.handleLecture}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s12"}, 
                            React.createElement("input", {id: "title", type: "text", className: "validate", ref: "lectureTitle"}), 
                            React.createElement("label", {for: "title"}, "Lecture Title")
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col s2"}, 
                            React.createElement("label", null, "Date"), 
                            React.createElement("input", {type: "date", className: "datepicker", ref: "date"})
                        ), 
                        React.createElement("div", {className: "col s2"}, 
                            React.createElement("label", null, "Start time: hours"), 
                            React.createElement("p", {className: "range-field"}, 
                                React.createElement("input", {type: "range", min: "0", max: "23", ref: "startHour"})
                            )
                        ), 
                        React.createElement("div", {className: "col s3"}, 
                            React.createElement("label", null, "Start time: minutes"), 
                            React.createElement("p", {className: "range-field"}, 
                                React.createElement("input", {type: "range", ref: "startMinutes", min: "0", max: "59"})
                            )
                        ), 
                        React.createElement("div", {className: "col s2"}, 
                            React.createElement("label", null, "Finish time: hours"), 
                            React.createElement("p", {className: "range-field"}, 
                                React.createElement("input", {type: "range", ref: "finishHour", min: "0", max: "23"})
                            )
                        ), 
                        React.createElement("div", {className: "col s3"}, 
                            React.createElement("label", null, "Finish time: minutes"), 
                            React.createElement("p", {className: "range-field"}, 
                                React.createElement("input", {type: "range", ref: "finishMinutes", min: "0", max: "59"})
                            )
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "col s3"}, 
                            React.createElement("label", null, "Select Author"), 
                            React.createElement("select", {className: "browser-default", ref: "lectureAuthor"}, 
                                    authorOptions
                            )
                        ), 
                        React.createElement("div", {className: "col s3"}, 
                            React.createElement("label", null, "Select Theme"), 
                            React.createElement("select", {className: "browser-default", ref: "lectureTheme"}, 
                                    themeOptions
                            )
                        ), 
                        React.createElement("div", {className: "col s3"}, 
                            React.createElement(FormButton, {action: action})
                        ), 
                        React.createElement("div", {className: "col s3"}, 
                            id ? React.createElement(DeleteButton, {onClick: this.handleDelete}) : null
                        )
                    )
                )
            )
        )
    }

});
var ThemeForm = React.createClass({displayName: "ThemeForm",
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

            React.createElement("div", {className: "col s12"}, 

                React.createElement("form", {className: "col s12", onSubmit: this.handleTheme}, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s12"}, 
                            React.createElement("input", {id: "title", type: "text", className: "validate", ref: "themeTitle"}), 
                            React.createElement("label", {for: "title"}, "Theme Title")
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "input-field col s12"}, 
                            React.createElement("textarea", {id: "description", className: "validate materialize-textarea", ref: "description"}), 
                            React.createElement("label", {for: "description"}, "Description")
                        )
                    ), 
                    React.createElement("div", {className: "col s3"}, 
                        React.createElement(FormButton, {
                            action: action}
                        )
                    ), 
                    React.createElement("div", {className: "col s3"}, 
                         id ? React.createElement(DeleteButton, {onClick: this.handleDelete}) : null
                    )
                )
            )
        )
    }
});
var FormWrap = React.createClass({displayName: "FormWrap",
    render: function(){

        return(
            React.createElement("div", {className: "row"}, 

                React.createElement(LectureForm, {
                    destId: this.props.destId.lecture, 
                    authors: this.props.authors, 
                    themes: this.props.themes, 
                    lectures: this.props.lectures, 
                    onSubmit: this.props.onSubmit}
                ), 

                React.createElement(AuthorForm, {
                    destId: this.props.destId.author, 
                    authors: this.props.authors, 
                    onSubmit: this.props.onSubmit}
                ), 

                React.createElement(ThemeForm, {
                    destId: this.props.destId.theme, 
                    themes: this.props.themes, 
                    onSubmit: this.props.onSubmit}
                )

            )
        );
    }
});

//Элемент: таблица
var TimeTable = React.createClass({displayName: "TimeTable",

    //Обращаемся к серверу за данными таблицы
    loadTimeTable: function(){
        $.ajax({
            url: this.props.dataGet,
            dataType: 'json',
            success: function(data){
                this.setState({data:data});
                this.setState({dataLoaded: true});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    getInitialState: function(){
        return {
            data:{
                lectures: undefined, authors: undefined, themes: undefined
            },
            dataLoaded: false,
            showForm: false
        };
    },

    //Загружаем данные с сервера
    componentDidMount: function(){
        this.loadTimeTable();
    },

    onFormSubmit: function(data){
        var postUrl = '';
        var oldData= this.state.data;
        function changeData(incData){
            switch (data.action) {
                case 'Add':
                    incData.push(data);
                    break;
                case 'Edit':
                    incData.forEach(function (elem, key) {
                        if (elem._id == data._id) {
                            incData[key] = data;
                        }
                    });
                    break;
                case 'Delete':
                    incData.forEach(function (elem, key) {
                        if (elem._id == data._id) {
                            delete incData[key];
                        }
                    });
                    break;
            }
        }


            //по количеству ключей определяем что мы отправляем в базу
            switch(data.entity) {
                case 'Lecture':
                    postUrl = '/lecture';
                    changeData(oldData.lectures);
                    break;
                case 'Author':
                    postUrl = '/author';
                    changeData(oldData.authors);
                    break;
                case 'Theme':
                    postUrl = '/theme';
                    changeData(oldData.themes);
                    break;
            }
        //Обновляем данные на странице
        this.setState({data: oldData}, function(){
            //Отправляем данные на сервер
            $.ajax({
                url: postUrl,
                type: 'POST',
                data: data,
                success: function(returnData) {
                    this.setState({data: returnData});
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        });
    },

    //Обработчик нажатия на кнопку и строку таблицы
    handleClick: function(task, entity, id){
        this.props.task = task;
        this.props.entity = entity;
        switch (entity){
            case('Lecture'):
                this.props.destId.lecture = id;
                this.props.destId.author = null;
                this.props.destId.theme = null;
                break;
            case('Author'):
                this.props.destId.lecture = null;
                this.props.destId.author = id;
                this.props.destId.theme = null;
                break;
            case('Theme'):
                this.props.destId.lecture = null;
                this.props.destId.author = null;
                this.props.destId.theme = id;
                break;
        }
        this.setState({showForm: true});
    },

    render: function(){
        var rows = [];
        var themePass = ["Themes loading..."];
        var authorPass = ["Authors loading..."];
        var lecturePass = ["Lectures loading..."];
        if (this.state.dataLoaded) {

            //Передача данных в child элементы
            themePass = this.state.data.themes;
            authorPass = this.state.data.authors;
            lecturePass = this.state.data.lectures;

            //Для каждой лекции создаем новый ряд таблицы( элемент реакта) и передаем в него запись
            var self = this;
            this.state.data.lectures.forEach(function (lecture) {


                //Проверяем всех авторов и все темы и находим тех и те, которые имеют отношение к лекции
                var themes = [];
                self.state.data.themes.forEach(function (theme) {
                    lecture.theme_id.forEach(function (id) {
                        if (theme._id == id) themes.push(theme);
                    });
                });


                var authors = [];
                self.state.data.authors.forEach(function (author) {
                    lecture.author_id.forEach(function (id) {
                        if (author._id == id) authors.push(author);
                    });
                });

                rows.push(React.createElement(Row, {
                    lecture: lecture, 
                    authors: authors, 
                    themes: themes, 
                    onClick: self.handleClick}
                ));
            });
        }


        //Рисуем таблицу

        return (
            React.createElement("span", null, 

                React.createElement("table", {className: "hoverable"}, 

                    React.createElement("thead", null, 
                        React.createElement("tr", null, 
                            React.createElement("th", null, "Author", 
                                React.createElement(AddBtn, {onClick: this.handleClick, entity: "Author"})
                            ), 
                            React.createElement("th", null, "Theme", 
                                React.createElement(AddBtn, {onClick: this.handleClick, entity: "Theme"})
                            ), 
                            React.createElement("th", null, "Lecture", 
                                React.createElement(AddBtn, {onClick: this.handleClick, entity: "Lecture"})
                            ), 
                            React.createElement("th", null, "D:t")
                        )
                    ), 

                    React.createElement("tbody", null, rows)

                ), 

                React.createElement(FormWrap, {
                    //Коллбэк для отправки формы
                    onSubmit: this.onFormSubmit, 
                    //Передаем информацию о том, что меняем/добавляем: автора/тему/лекцию
                    entity: this.props.entity, 
                    //Передаем id edit'a
                    destId: this.props.destId, 

                    themes: themePass, 
                    authors: authorPass, 
                    lectures: lecturePass}
                )

            )
        );
    }
});

React.render(
    React.createElement(TimeTable, {dataGet: "timetable", task: "Add", entity: "Lecture", destId: {lecture:'', author:'', theme:''}}),
    document.getElementById('react-mount')
);