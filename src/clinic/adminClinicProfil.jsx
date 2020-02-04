import React, { Component } from "react";
import Sidebar from "../generic_components/sidebar";
import AbsenceRequests from "../doctor/absenceRequests";

class AdminClinicProfil extends Component {

  state = { main: <div></div> };

  changeToRequests = () => {
    this.setState({main: <AbsenceRequests />});
  };

  render() {

    return (
        <div className="container-fluid pt-2">
          <div className="row">

            <Sidebar links={[{id:1,text:"User profile"},{id:2,text:"Clinic profile",onClick:this.props.changeToClinic},{id:3,text:"Clinic report"},{id:4,text:"Absence requests",onClick:this.changeToRequests}]}
            />

            <div className="col">{this.state.main}</div>
          </div>
        </div>
    );
  }
}

export default AdminClinicProfil;
