import React, { Component } from "react";
import ClinicProfileNav from "./clinicProfileNav";

class ClinicAdminNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="col-sm-12 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                User profile
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={this.props.changeToClinic}
                className="nav-link"
                href="#"
              >
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
    );
  }
}

export default ClinicAdminNav;
