import React, {Component} from 'react';

class Select extends Component {
    render() {
        return (
            this.props.options && <select onChange={this.props.onChange}>
                <option key='default' value='default'>Make a selection</option>
                {this.props.options.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
            </select>
        );
    }
}

export default Select;