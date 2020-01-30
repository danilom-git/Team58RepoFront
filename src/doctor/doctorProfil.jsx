import React, { Component } from "react";
import Sidebar from "../generic_components/sidebar";
import Patients from "./patients";
import Patient from "./patient";

class DoctorProfil extends Component {
  state = {
      main: <div></div>
  };

  showPatients = () => {
      this.setState({main:<Patients changeToPatient={this.showPatient}/>});
  };

  showPatient = (e,patient) => {
      this.setState({main:<Patient patient={patient}/>});
  };

  render() {
    return (
        <div className="container-fluid pt-2">
            <div className="row">
                <Sidebar
                links={[{id: 1, text: 'User profile'},{id: 2, text: 'Patients',onClick:this.showPatients},{id: 3, text: 'Working calendar'},{id: 4, text: 'Absence request'},{id: 5, text: 'Annual leave request'}]}
                />
                {this.state.main}
            </div>
        </div>
    );
  }
}

export default DoctorProfil;
