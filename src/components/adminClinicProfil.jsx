import React, { Component } from "react";
import ClinicAdminNav from "./clinicAdminNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";

class AdminClinicProfil extends Component {
  constructor(props) {
    super(props);
  }
  state = { main: <div></div> };
  render() {
    return (
      <div className="row">
        <div className="col-sm-12">
          <ClinicAdminNav changeToClinic={this.props.changeToClinic} />
        </div>
        <div className="col">{this.state.main}</div>
      </div>
    );
  }
}

export default AdminClinicProfil;
