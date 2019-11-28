import React, { Component } from "react";
import ClinicProfilNav from "./clinicProfileNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";

class ClinicProfil extends Component {
  state = { main: <div></div> };

  showDoctors = () => {
    this.setState({ main: <Doctors changeToForm={this.changeToForm} /> });
  };

  changeToForm = () => {
    this.setState({ main: <DoctorAddForm /> });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-2">
          <ClinicProfilNav showDoctors={this.showDoctors} />
        </div>
        <div className="col-sm-8">{this.state.main}</div>
      </div>
    );
  }
}

export default ClinicProfil;
