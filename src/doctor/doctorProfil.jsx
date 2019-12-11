import React, { Component } from "react";
import Sidebar from "../generic_components/sidebar";

class DoctorProfil extends Component {
  state = {};
  render() {
    return (
        <div className="container-fluid pt-2">
          <div className="row">
            <Sidebar
              links={[{id: 1, text: 'User profile'},{id: 2, text: 'Patients'},{id: 6, text: 'Working calendar'},{id: 7, text: 'Absence request'},{id: 8, text: 'Annual leave request'}]}
            />
          </div>
        </div>

    );
  }
}

export default DoctorProfil;
