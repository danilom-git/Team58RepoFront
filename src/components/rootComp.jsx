import React, { Component } from "react";
import DoctorNav from "./doctorNav";
import Header from "./header";
import ClinicAdminNav from "./clinicAdminNav";
import MainComp from "./mainComp";
import { Provider } from "react-redux";
import store from "../store";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";

class RootComp extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="row">
          <div className="col">
            <Header />
          </div>
        </div>

        <div className="container-fluid m-0 p-0">
          <div className="row">
            <div className="col-sm-2">
              <ClinicAdminNav />
            </div>
            <DoctorAddForm />
            <Doctors />
          </div>
        </div>
      </Provider>
    );
  }
}

export default RootComp;
