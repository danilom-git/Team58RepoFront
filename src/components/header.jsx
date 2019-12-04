import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-sm p-1 bg-dark navbar-dark sticky-top shadow">
                <h3 className="text-white m-1 mr-auto">{this.props.title}</h3>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href='#' className="nav-link" onClick={this.props.openPatientPage}>Patient Page</a>
                    </li>
                    <li className="nav-item">
                        <a href='#' className="nav-link" onClick={this.props.openClinicPage}>Clinic Page</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Header;