import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav className="navbar flex-md-nowrap p-0 bg-dark navbar-dark shadow">
                <h3 className="text-white m-1">Home page</h3>
                <button onClick={this.props.openClinics}>Open Clinics</button>
            </nav>
        );
    }
}

export default Header;