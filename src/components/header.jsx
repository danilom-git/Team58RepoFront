import React, { Component } from "react";

class Header extends Component {
    constructor(props){
        super(props);
    }

    state = {};
    render() {
        return (
            <nav className="navbar flex-md-nowrap p-1 bg-dark navbar-dark shadow">
                <h3 className="text-white m-1">Home page</h3>
            </nav>
        );
    }
}

export default Header;