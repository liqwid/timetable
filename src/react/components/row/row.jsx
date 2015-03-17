//Элемент: ряд таблицы
var Row = React.createClass({
    render: function() {
        var self = this;

        //Внутри таблицы на новой строчке отображается новый автор, создаем элемент Author и передаем в него id и запись для таблицы
        var authorlines = [];

        this.props.authors.forEach(function(author){

            var value = author.lastname + ' ' + author.name;

            authorlines.push(<Line
                entity = "Author"
                id = {author._id}
                value = {value}
                onClick = {self.props.onClick}
            />)
        });

        //Внутри таблицы на новой строчке отображается новая тема, создаем элемент Theme и передаем в него id и запись для таблицы
        var themelines = [];
        this.props.themes.forEach(function(theme){
            themelines.push(<Line
                entity = "Theme"
                id = {theme._id}
                value = {theme.title}
                onClick = {self.props.onClick}
            />)
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
            <tr>
                <ul>{authorlines}</ul>
                <ul>{themelines}</ul>
                <td><Line
                    entity = "Lecture"
                    onClick = {this.props.onClick}
                    value = {this.props.lecture.title}
                    id = {this.props.lecture._id}
                /></td>
                <td><Line
                    entity = "Lecture"
                    onClick = {this.props.onClick}
                    value = {timeval}
                    id = {this.props.lecture._id}
                /></td>
            </tr>
        );
    }
});