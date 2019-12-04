import React, {Component} from 'react';

/**
 * props: labelText, defaultId, defaultText, options, onChange
 * options: [ {id, text}, ... ]
 */

class Select extends Component {
    render() {
        let defaultDefaultId = 'default';
        let defaultDefaultText = 'Default';
        let defaultLabelText = 'Make a selection:'

        return (
            <div className='form-group'>
                <label htmlFor='sel'>{this.props.labelText ? this.props.labelText : defaultLabelText}</label>
                <select
                    onChange={this.props.onChange}
                    className='custom-select'
                    id='sel'
                >
                    <option key={this.props.defaultId ? this.props.defaultId : defaultDefaultId}
                            value={this.props.defaultId ? this.props.defaultId : defaultDefaultId}>
                        {this.props.defaultText ? this.props.defaultText : defaultDefaultText}
                    </option>
                    {this.props.options && this.props.options.length &&
                        this.props.options.map(option => <option key={option.id} value={option.id}>{option.text}</option>)}
                </select>
            </div>
        );
    }
}

export default Select;