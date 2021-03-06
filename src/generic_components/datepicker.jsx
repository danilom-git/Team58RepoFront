import React, {Component} from 'react';
import {dateToString} from "../utils/utils";

/**
 * props: labelText, minDate, onChange
 */
class DatePicker extends Component {
    render() {
        let defaultMinDate = dateToString(new Date());
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
                    value={this.props.selectedDate}
                />
            </div>
        );
    }
}

export default DatePicker;