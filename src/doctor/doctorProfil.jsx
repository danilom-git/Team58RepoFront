import React, { Component } from "react";
import Sidebar from "../generic_components/sidebar";
import Patients from "./patients";
import Patient from "./patient";
import Absence from "./absence";
import DoctorCheckupRequest from "./doctorCheckupRequest";

class DoctorProfil extends Component {
  state = {
      main: <div></div>
  };

  showDoctorRequest = (e,patient) =>{
      this.setState({main:<DoctorCheckupRequest changeToPatient={this.showPatient} patient={patient} />});
  };

  showAbsence = () => {
      this.setState({main:<Absence />});
  };

  showPatients = () => {
      this.setState({main:<Patients changeToPatient={this.showPatient}/>});
  };

  showPatient = (e,patient) => {
      this.setState({main:<Patient  changeToDoctorRequest={this.showDoctorRequest} patient={patient}/>});
  };

  render() {
    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <Sidebar
                links={[{id: 1, text: 'User profile'},{id: 2, text: 'Patients',onClick:this.showPatients},{id: 3, text: 'Working calendar'},{id: 4, text: 'Absence request',onClick:this.showAbsence}]}
                />
                {this.state.main}
            </div>
        </div>
    );
  }
}

export default DoctorProfil;
