import React from 'react';
import {Navigation} from 'react-router';
import _ from 'lodash';
import timeSlots from 'utils/timeSlots';
import formatAuthorsIds from 'utils/formatAuthorsIds';
import formatAuthorsOptions from 'utils/formatAuthorsOptions';
import formatThemesIds from 'utils/formatThemesIds';
import formatThemesOptions from 'utils/formatThemesOptions';
import dataActions from 'actions/dataActions';
import lectureStore from 'stores/lectureStore';
import themeStore from 'stores/themeStore';
import authorStore from 'stores/authorStore';
import Header from 'components/commons/header';
import TextInputField from 'components/form/textInputField';
import Select from 'components/form/select';
import MultiSelect from 'components/form/multiSelect';
import FormDatePicker from 'components/form/formDatePicker';
import ApplyButton from 'components/form/applyButton';
import CancelButton from 'components/form/cancelButton';


const LectureForm = React.createClass({
    mixins: [Navigation],

    contextTypes: {
        router: React.PropTypes.func.isRequired
    },

	handleSubmit() {
		let lecture = {};
		lecture.id = this.context.router.getCurrentParams().id;
		lecture.title = this.refs.title.getValue();
		lecture.timeSlot = this.refs.timeSlot.getValue();
		lecture.authorsIds = this.refs.authors.getValue();
		lecture.themesIds = this.refs.themes.getValue();
		lecture.date = this.refs.datePicker.getValue();
		if (lecture.title) {
			dataActions.post(lecture, 'lectures');
            if (lecture.id === 'new') {
                this.transitionTo('lectures');
            } else {
                this.transitionTo('lecture', {id: lecture.id});
            }
		}
	},

	render() {
		const id = this.context.router.getCurrentParams().id;
		let header;
		let lecture = {};
		if (id === 'new') {
			header = 'Add Lecture';
			lecture.title = '';
			lecture.timeslot = 0;
			lecture.authorsIds = [];
			lecture.themesIds = [];
			lecture.date = new Date();
		} else {
			header = 'Edit Lecture Info';
        	lecture = _.find(lectureStore.data, {id: id});
    	}

	    return (
	        <span>
	            <Header value = {header}/>
	            <form onSubmit = {this.handleSubmit}>
	                <div className = 'entry-wrap form-wrap'>
                        <TextInputField
                            value = {lecture.title}
                            label = 'Lecture Title'
                            required = {true}
                            onSubmit = {this.handleSubmit}
                            multiLine = {true}
                            ref = 'title'
                        />
                        <Select
                            title = 'Time Slots'
                            options = {timeSlots}
                            selectedId = {lecture.timeslot}
                            ref = 'timeSlot'
                        />
                        <MultiSelect
                        	title = 'Authors'
                        	options = {formatAuthorsOptions(authorStore.data)}
                        	selectedIndexes = {formatAuthorsIds(lecture.authorsIds)}
                        	ref = 'authors'
                    	/>
                        <MultiSelect
                        	title = 'Themes'
                        	options = {formatThemesOptions(themeStore.data)}
                        	selectedIndexes = {formatThemesIds(lecture.themesIds)}
                        	ref = 'themes'
                    	/>
	                </div>
	                <ApplyButton
                        dataType = 'lecture'
                        id = {id}
                    />
	            </form>
	            <div className = 'entry-wrap form-wrap'>
	                <FormDatePicker
	                   	defaultDate = {lecture.date}
	                    ref = 'datePicker'
	                />
                </div>
	            <CancelButton
	            	dataType = 'lecture'
	            	id = {id}
            	/>
	        </span>
	    );
	}
});

export {LectureForm as default};
