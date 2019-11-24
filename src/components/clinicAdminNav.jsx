import React, { Component } from "react";
import ClinicProfileNav from "./clinicProfileNav";
import {
  setClinicAdminRender,
  setClinicRender
} from "../actions/clinicActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class ClinicAdminNav extends Component {
  componentDidMount() {
    console.log(this.props);
  }

  clinicProfileClick = () => {
    this.props.setClinicAdminRender(false);
    this.props.setClinicRender(true);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.renderClinicProfileNav && <ClinicProfileNav />}
        {this.props.renderClinicAdminNav && (
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
                    onClick={this.clinicProfileClick}
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
        )}
      </React.Fragment>
    );
  }
}

ClinicAdminNav.propTypes = {
  setClinicAdminRender: PropTypes.func.isRequired,
  setClinicRender: PropTypes.func.isRequired,
  renderClinicProfileNav: PropTypes.bool,
  renderClinicAdminNav: PropTypes.bool
};

const mapStateToProps = state => ({
  renderClinicAdminNav: state.clinicInfo.renderClinicAdminNav,
  renderClinicProfileNav: state.clinicInfo.renderClinicProfileNav
});

export default connect(mapStateToProps, {
  setClinicAdminRender,
  setClinicRender
})(ClinicAdminNav);
