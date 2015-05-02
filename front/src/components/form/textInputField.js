import React from 'react';
import _ from 'lodash';
import {TextField} from 'material-ui';

const TextInputField = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        label: React.PropTypes.string.isRequired,
        required: React.PropTypes.bool.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
        multiLine: React.PropTypes.bool
    },

    handleEnter() {
        this.refs.textField.blur();
        this.props.onSubmit();
    },

    validate() {
        if (_.trim(this.refs.textField.getValue()) === '' && this.props.required) {
            this.refs.textField.setErrorText('This field is required');
            return false;
        } else {
            return true;
        }
    },

    handleBlur() {
        this.validate();
    },

    clearError() {
        this.refs.textField.setErrorText('');
    },

    getValue() {
        if (this.validate()) {
            return this.refs.textField.getValue();
        } else {
            return false;
        }
    },

    render() {
        return (
            <div>
                <TextField
                    ref = 'textField'
                    defaultValue = {this.props.value}
                    floatingLabelText = {this.props.label}
                    onEnterKeyDown = {this.handleEnter}
                    onBlur = {this.handleBlur}
                    onFocus = {this.clearError}
                    multiLine = {this.props.multiLine}
                />
            </div>
        );
    }
});

export {TextInputField as default};
