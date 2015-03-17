var LectureForm = React.createClass({

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
            <div className="col s12">
                    <form className="col s12" onSubmit={this.handleLecture}>
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
        )
    }

});