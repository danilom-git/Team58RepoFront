import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDoctors } from "../actions/clinicActions";
import {
  setDoctorsRender,
  setDoctorFormRender
} from "../actions/clinicActions";

class Doctors extends React.Component {
  componentDidMount(nextProps) {
    console.log("Mount Doctors");
    this.props.getDoctors();
  }

  componentDidUpdate(nextProps) {
    //novi doktor dodavanje
    if (nextProps.newDoctor) {
      console.log("iz Update", nextProps.newDoctor);
      this.props.doctors.concat(nextProps.newDoctor);
    }
  }

  addDoctorHandle = () => {
    this.props.setDoctorsRender(false);
    this.props.setDoctorFormRender(true);
  };

  render() {
    const doctors = this.props.doctors.map(doctor => (
      <div key={doctor.id}>
        <p>Ime: {doctor.name}</p>
        <p>Prezime: {doctor.lastName}</p>
      </div>
    ));
    return (
      <React.Fragment>
        {this.props.renderDoctors && (
          <div>
            <button onClick={this.addDoctorHandle} className="btn btn-dark m-2">
              Add doctor
            </button>
            <div className="m-2">{doctors}</div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

Doctors.propTypes = {
  setDoctorsRender: PropTypes.func.isRequired,
  setDoctorFormRender: PropTypes.func.isRequired,
  getDoctors: PropTypes.func.isRequired,
  doctors: PropTypes.array.isRequired,
  renderDoctors: PropTypes.bool,
  newDoctor: PropTypes.object
};

const mapStateToProps = state => ({
  doctors: state.clinicInfo.doctors,
  renderDoctors: state.clinicInfo.renderDoctors,
  newDoctor: state.clinicInfo.newDoctor
});

export default connect(mapStateToProps, {
  getDoctors,
  setDoctorsRender,
  setDoctorFormRender
})(Doctors);
