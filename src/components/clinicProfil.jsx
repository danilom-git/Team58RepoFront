import React, { Component } from "react";
import ClinicProfilNav from "./clinicProfileNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";
import Halls from "./halls";

class ClinicProfil extends Component {
  state = { main: <div></div> };

  showDoctors = () => {
    this.setState({ main: <Doctors /> });
  };

  changeToAddDoctor = () => {
    this.setState({ main: <DoctorAddForm /> });
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-2">
          <ClinicProfilNav showDoctors={this.showDoctors} changeToAddDoctor={this.changeToAddDoctor} />
        </div>
        <div className="col">{this.state.main}</div>
      </div>
    );
  }
}

export default ClinicProfil;
