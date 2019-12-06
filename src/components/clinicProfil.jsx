import React, { Component } from "react";
import ClinicProfilNav from "./clinicProfileNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";
import Halls from "./halls";
import HallAddForm from  "./hallAddForm";
import ShowDoctor from "./showDoctor";
import Sidebar from "../generic_components/sidebar";
import ShowHall from "./showHall";
import OneClickForm from "./oneClickForm";
import OneClicks from "./OneClicks";

class ClinicProfil extends Component {
    state = { main: <div/> };

    showDoctors = () => {
        this.setState({ main: <Doctors showDoctor={this.changeToShowDoctor}/> });
    };

    showHalls = () => {
        this.setState({ main: <Halls showHall={this.changeToShowHall}/> });
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

    changeToShowHall = (e,hall) => {
        this.setState({ main: <ShowHall hall={hall} /> });
    }

    changeToOneClickForm = () => {
        this.setState({ main: <OneClickForm /> });
    }

    changeToOneClick = () => {
        this.setState({ main: <OneClicks /> });
    }

    render() {
        //<ClinicProfilNav showHalls={this.showHalls} changeToAddHall={this.changeToAddHall} showDoctors={this.showDoctors} changeToAddDoctor={this.changeToAddDoctor} />
        return (
            <div className="container-fluid pt-2">
                <div className="row">
                    <Sidebar
                        links={[{id: 1, text: 'Doctors', onClick: this.showDoctors}, {id: 2, text: 'Add doctor',onClick: this.changeToAddDoctor}, {id: 3, text: 'Halls',onClick: this.showHalls}, {id: 4, text: 'Add hall',onClick: this.changeToAddHall},{id: 5, text: 'Add checkups',onClick: this.changeToOneClickForm},{id: 6, text: 'Checkups',onClick: this.changeToOneClick}]}/>

                    <div className="col">{this.state.main}</div>
                </div>
            </div>
        );
    }
}

export default ClinicProfil;
