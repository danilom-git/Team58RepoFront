import React, {Component} from 'react';

/**
 * props: links
 * links: [ {id, text, onClink}
 */
class Sidebar extends Component {
    render() {
        return (
            <ul className='col-12 nav flex-column float-left h-100 px-2 mt-2'>
                {this.props.links.map(link =>
                    <li className='nav-item mb-2'>
                        <button
                            onClick={link.onClick}
                            className='btn btn-outline-primary w-100 text-left'>
                            {link.text}
                        </button>
                    </li>)}
            </ul>
        );
    }
}

export default Sidebar;