import React, { Component } from "react";

class Header extends Component {
    constructor(props){
        super(props);
    }

    state = {};
    render() {
        return (
            <nav className="navbar flex-md-nowrap p-1 bg-dark navbar-dark shadow">
                <h3 className="text-white m-1">{this.props.title}</h3>

                <btn className="btn btn-primary" onClick={this.props.openPatientPage}>Patient Page</btn>
                <btn className="btn btn-primary" onClick={this.props.openClinicPage}>Clinic Page</btn>
            </nav>
        );
    }
}

export default Header;