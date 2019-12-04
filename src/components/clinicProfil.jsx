import React, { Component } from "react";
import ClinicProfilNav from "./clinicProfileNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";
import Halls from "./halls";
import HallAddForm from  "./hallAddForm";
import ShowDoctor from "./showDoctor";

class ClinicProfil extends Component {
    state = { main: <div/> };

    showDoctors = () => {
        this.setState({ main: <Doctors showDoctor={this.changeToShowDoctor}/> });
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

    changeToShowDoctor = (e,doctor) => {
        this.setState({ main: <ShowDoctor doctor={doctor} /> });
    }

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
