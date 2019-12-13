import React, {Component} from "react";
import Doctors from "../doctor/doctors";
import DoctorAddForm from "../doctor/doctorAddForm";
import Halls from "../hall/halls";
import HallAddForm from "../hall/hallAddForm";
import ShowDoctor from "../doctor/showDoctor";
import Sidebar from "../generic_components/sidebar";
import ShowHall from "../hall/showHall";
import OneClickForm from "../checkup/oneClickForm";
import OneClicks from "../checkup/OneClicks";

class ClinicProfil extends Component {
    state = {main: <div></div>};

    showDoctors = () => {
        this.setState({main: <Doctors admin={this.props.admin} showDoctor={this.changeToShowDoctor}/>});
    };

    showHalls = () => {
        this.setState({main: <Halls admin={this.props.admin} showHall={this.changeToShowHall}/>});
    };

    changeToAddDoctor = () => {
        this.setState({main: <DoctorAddForm admin={this.props.admin}/>});
    };

    changeToAddHall = () => {
        this.setState({main: <HallAddForm admin={this.props.admin}/>});
    };

    changeToShowDoctor = (e, doctor) => {
        this.setState({main: <ShowDoctor doctor={doctor}/>});
    };

    changeToShowHall = (e, hall) => {
        this.setState({main: <ShowHall hall={hall}/>});
    };

    changeToOneClickForm = () => {
        this.setState({main: <OneClickForm/>});
    };

    changeToOneClick = () => {
        this.setState({main: <OneClicks/>});
    };

    render() {
        //<ClinicProfilNav showHalls={this.showHalls} changeToAddHall={this.changeToAddHall} showDoctors={this.showDoctors} changeToAddDoctor={this.changeToAddDoctor} />
        return (
            <div className="container-fluid pt-2">
                <div className="row">
                    <Sidebar
                        links={[{id: 1, text: 'Doctors', onClick: this.showDoctors}, {
                            id: 2,
                            text: 'Add doctor',
                            onClick: this.changeToAddDoctor
                        }, {id: 3, text: 'Halls', onClick: this.showHalls}, {
                            id: 4,
                            text: 'Add hall',
                            onClick: this.changeToAddHall
                        }, {id: 5, text: 'Add checkups', onClick: this.changeToOneClickForm}, {
                            id: 6,
                            text: 'Checkups',
                            onClick: this.changeToOneClick
                        }, {id: 7, text: 'Checkup types'}]}/>

                    <div className="col">{this.state.main}</div>
                </div>
            </div>
        );
    }
}

export default ClinicProfil;
