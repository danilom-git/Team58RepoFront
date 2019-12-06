import React, { Component } from "react";
import ClinicAdminNav from "./clinicAdminNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";
import Halls from "./halls";
import HallAddForm from "./hallAddForm";
import ShowDoctor from "./showDoctor";
import Sidebar from "../generic_components/sidebar";

class AdminClinicProfil extends Component {
  constructor(props) {
    super(props);
  }
  state = { main: <div></div> };




  render() {
      //<ClinicAdminNav changeToClinic={this.props.changeToClinic} />
    return (
        <div className="container-fluid pt-2">
      <div className="row">

          <Sidebar links={[{id:1,text:"User profile"},{id:2,text:"Clinic profile",onClick:this.props.changeToClinic},{id:3,text:"Clinic report"}]}
          />

        <div className="col">{this.state.main}</div>
      </div>
        </div>
    );
  }
}

export default AdminClinicProfil;
