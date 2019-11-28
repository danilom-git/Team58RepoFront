import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ClinicProfil from "./components/clinicProfil";
import AdminClinicProfil from "./components/adminClinicProfil";
import DoctorProfil from "./components/doctorProfil";
import Header from "./components/header";
import { tsConstructorType } from "@babel/types";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profil: <AdminClinicProfil changeToClinic={this.changeToClinic} />
    };
    this.changeToClinic = this.changeToClinic.bind(this);
  }

  changeToClinic = () => {
    this.setState({ profil: <ClinicProfil /> });
  };

  render() {
    return (
      <div className="container-fluid m-0 p-0">
        <div className="row">
          <div className="col">
            <Header />
          </div>
        </div>

        <div className="container-fluid m-0 p-0">
          <div className="col-sm-2">{this.state.profil}</div>
        </div>
      </div>
    );
  }
}

export default App;
