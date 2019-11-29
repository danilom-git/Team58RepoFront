import React, { Component } from "react";
import ClinicProfilNav from "./clinicProfileNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";
import Halls from "./halls";
import HallAddForm from  "./hallAddForm";

class ClinicProfil extends Component {
    state = { main: <div/> };

    showDoctors = () => {
        this.setState({ main: <Doctors /> });
    };

    showHalls = () => {
        this.setState({ main: <Halls /> });
    }

    changeToAddDoctor = () => {
        this.setState({ main: <DoctorAddForm /> });
    };

    changeToAddHall = () => {
        this.setState({ main: <HallAddForm /> });
    };

    render() {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <ClinicProfilNav showHalls={this.showHalls} changeToAddHall={this.changeToAddHall} showDoctors={this.showDoctors} changeToAddDoctor={this.changeToAddDoctor} />
                </div>
                <div className="col">{this.state.main}</div>
            </div>
        );
    }
}

export default ClinicProfil;
