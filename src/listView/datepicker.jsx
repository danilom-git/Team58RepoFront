import React, {Component} from 'react';

class DatePicker extends Component {
    render() {
        let minDate = new Date();

        return (
            <React.Fragment>
                <input className="col-sm-2"
                    type='date'
                    onChange={this.props.onChange}
                    min={minDate.getFullYear() + '-' + (minDate.getMonth() + 1) + '-' + minDate.getDate()}/>
            </React.Fragment>
        );
    }
}

export default DatePicker;