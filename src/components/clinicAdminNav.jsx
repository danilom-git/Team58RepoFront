import React, { Component } from "react";
import ClinicProfileNav from "./clinicProfileNav";

class ClinicAdminNav extends Component {
    state = {
        toRender : true
    };

    constructor(props){
       super(props);
       this.state.toRender = this.props.toRender;
       this.clinicProfileRef = React.createRef();
    }

    clinicProfileClick = () => {
        this.clinicProfileRef.current.handleClick();
        this.setState({toRender:false});
    }


    render() {

            return (<React.Fragment>
                <ClinicProfileNav ref={this.clinicProfileRef}/>
                {
                    this.state.toRender &&
                    <nav className="col-sm-12 d-none d-md-block bg-light sidebar">
                        <div className="sidebar-sticky">
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        User profile
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a onClick={this.clinicProfileClick} className="nav-link" href="#">
                                        Clinic profile
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">
                                        Clinic report
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                }

            </React.Fragment>);
    }


}

export default ClinicAdminNav;