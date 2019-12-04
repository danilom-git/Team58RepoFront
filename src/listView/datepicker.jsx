import React, {Component} from 'react';

class DatePicker extends Component {
    render() {
        let minDate = new Date();

        return (
            <React.Fragment>
                <input
                    type='date'
                    className="form-control"
                    onChange={this.props.onChange}
                    min={minDate.getFullYear() + '-' + (minDate.getMonth() + 1) + '-' + minDate.getDate()}/>
            </React.Fragment>
        );
    }
}

export default DatePicker;