import React, { Component } from "react";
import { connect } from "react-redux";
import { setDoctorsRender } from "../actions/clinicActions";
import PropTypes from "prop-types";

class ClinicAdminNav extends Component {
  handleClick = () => {
    this.props.setDoctorsRender(true);
  };

  render() {
    return (
      <nav className="col-sm-12 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a onClick={this.handleClick} className="nav-link" href="#">
                Doctors
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Halls
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

ClinicAdminNav.propTypes = {
  setDoctorsRender: PropTypes.func.isRequired,
  renderDoctors: PropTypes.bool
};

export default connect(null, { setDoctorsRender })(ClinicAdminNav);
