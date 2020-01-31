import React, { Component } from "react";

/**
 * props: title, links
 * links: [ {id, text, onClick}, ... ]
 */
class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand bg-primary navbar-dark sticky-top">
                <h1 className="navbar-brand flex-grow-1">{this.props.title}</h1>

                <ul className='navbar-nav'>
                    {
                        this.props.links && this.props.links.map(link =>
                            <li key={link.id} className='nav-item flex-fill'>
                                <button onClick={link.onClick} className='btn btn-link nav-link'>{link.text}</button>
                            </li>
                        )
                    }
                </ul>
            </nav>
        );
    }
}

export default Navbar;
