import React, {Component} from 'react';

/**
 * props: links
 * links: [ {id, text, onClink}
 */
class Sidebar extends Component {
    render() {
        return (
            <div className='col-2 m-0 p-0'>
                <ul className='nav flex-column px-2'>
                    {this.props.links.map(link =>
                        <li key={link.id} className='nav-item mb-2'>
                            <button
                                onClick={link.onClick}
                                className='btn btn-outline-primary w-100 text-left'>
                                {link.text}
                            </button>
                        </li>)}
                </ul>
            </div>
        );
    }
}

export default Sidebar;
