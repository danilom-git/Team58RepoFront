import React, { Component } from "react";
import ClinicProfilNav from "./clinicProfileNav";
import Doctors from "./doctors";
import DoctorAddForm from "./doctorAddForm";
import Halls from "./halls";
import HallAddForm from  "./hallAddForm";
import ShowDoctor from "./showDoctor";
import Sidebar from "../generic_components/sidebar";

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
        //<ClinicProfilNav showHalls={this.showHalls} changeToAddHall={this.changeToAddHall} showDoctors={this.showDoctors} changeToAddDoctor={this.changeToAddDoctor} />
        return (
            <div className="row">
                <div className="col-sm-2">
                    <Sidebar
                        links={[{id: 1, text: 'Doctors', onClick: this.showDoctors}, {id: 2, text: 'Add doctor',onClick: this.changeToAddDoctor}, {id: 3, text: 'Halls',onClick: this.showHalls}, {id: 4, text: 'Add hall',onClick: this.changeToAddHall}]}/>
                </div>
                <div className="col">{this.state.main}</div>
            </div>
        );
    }
}

export default ClinicProfil;
