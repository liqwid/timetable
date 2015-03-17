//Подключаем элементы реакта с помощью gulp-rigger

//= components/row/lines/line.jsx
//= components/row/row.jsx

//= components/buttons/addbtn.jsx

//= components/form/buttons/formbutton.jsx
//= components/form/buttons/deletebutton.jsx
//= components/form/forms/authorform.jsx
//= components/form/forms/lectureform.jsx
//= components/form/forms/themeform.jsx
//= components/form/formwrap.jsx

//= components/timetable.jsx

React.render(
    <TimeTable dataGet="timetable" task="Add" entity="Lecture" destId={{lecture:'', author:'', theme:''}}/>,
    document.getElementById('react-mount')
);