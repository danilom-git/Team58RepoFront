import React, {Component} from 'react';

// props: onChange, defaultId, defaultText, options, labelText
// options: [ {id, text}, ... ]

class Select extends Component {
    render() {
        return (
            this.props.options &&
            <div className='form-group'>
                <label for='sel'>{this.props.labelText}</label>
                <select
                    onChange={this.props.onChange}
                    className='custom-select'
                    id='sel'
                >
                    <option key={this.props.defaultId} value={this.props.deafultId}>{this.props.defaultText}</option>
                    {this.props.options.map(x => <option key={x.id} value={x.id}>{x.text}</option>)}
                </select>
            </div>
        );
    }
}

export default Select;