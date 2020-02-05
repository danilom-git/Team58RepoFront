import React, { Component } from "react";
import Sidebar from "../generic_components/sidebar";
import AbsenceRequests from "../doctor/absenceRequests";
import CheckupRequests from "../checkup/checkupRequests";
import SearchHall from "../hall/searchHall";

class AdminClinicProfil extends Component {

  state = { main: <div></div> };

  changeToSearchHall = (requestId) => {
      this.setState({main: <SearchHall requestId={requestId} />});
  };

  changeToRequests = () => {
    this.setState({main: <AbsenceRequests />});
  };

  changeToCheckupRequests = () => {
      this.setState({main: <CheckupRequests changeToSearchHall={this.changeToSearchHall} />});
  };

  render() {

    return (
        <div className="container-fluid pt-2">
          <div className="row">

            <Sidebar links={[{id:1,text:"User profile"},{id:2,text:"Clinic profile",onClick:this.props.changeToClinic},{id:3,text:"Clinic report"},{id:4,text:"Absence requests",onClick:this.changeToRequests},,{id:5,text:"Checkup requests",onClick:this.changeToCheckupRequests}]}
            />

            <div className="col">{this.state.main}</div>
          </div>
        </div>
    );
  }
}

export default AdminClinicProfil;
