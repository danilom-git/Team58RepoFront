import React, {Component} from 'react';

class EmptyCuboid extends Component {
    render() {
        return (
            <p className='display-4'>
                Greetings {this.props.user && this.props.user.name}
            </p>
        );
    }
}

export default EmptyCuboid;
