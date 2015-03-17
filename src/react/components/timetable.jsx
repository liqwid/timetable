//Элемент: таблица
var TimeTable = React.createClass({

    //Обращаемся к серверу за данными таблицы
    loadTimeTable: function(){
        $.ajax({
            url: this.props.dataGet,
            dataType: 'json',
            success: function(data){
                this.setState({data:data});
                this.setState({dataLoaded: true});
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

                rows.push(<Row
                    lecture = {lecture}
                    authors = {authors}
                    themes = {themes}
                    onClick = {self.handleClick}
                />);
            });
        }


        //Рисуем таблицу

        return (
            <span>

                <table className="hoverable">

                    <thead>
                        <tr>
                            <th>Author
                                <AddBtn onClick={this.handleClick} entity='Author' />
                            </th>
                            <th>Theme
                                <AddBtn onClick={this.handleClick} entity='Theme' />
                            </th>
                            <th>Lecture
                                <AddBtn onClick={this.handleClick} entity='Lecture' />
                            </th>
                            <th>D:t</th>
                        </tr>
                    </thead>

                    <tbody>{rows}</tbody>

                </table>

                <FormWrap
                    //Коллбэк для отправки формы
                    onSubmit = {this.onFormSubmit}
                    //Передаем информацию о том, что меняем/добавляем: автора/тему/лекцию
                    entity = {this.props.entity}
                    //Передаем id edit'a
                    destId = {this.props.destId}

                    themes = {themePass}
                    authors = {authorPass}
                    lectures = {lecturePass}
                />

            </span>
        );
    }
});