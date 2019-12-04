import React, {Component} from 'react';

/**
 * props: labelText, minDate, onChange
 */
class DatePicker extends Component {
    render() {
        let today = new Date();
        let defaultMinDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let defaultLabelText = 'Select a date:';

        return (
            <div className='form-group'>
                <label htmlFor='dt'>{this.props.labelText ? this.props.labelText : defaultLabelText}</label>
                <input
                    type='date'
                    className="form-control"
                    onChange={this.props.onChange}
                    min={this.props.minDate ? this.props.minDate : defaultMinDate}
                    id='dt'
                />
            </div>
        );
    }
}

export default DatePicker;