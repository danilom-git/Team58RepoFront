import React, {Component} from "react";
import Doctors from "../doctor/doctors";
import Halls from "../hall/halls";
import ShowDoctor from "../doctor/showDoctor";
import Sidebar from "../generic_components/sidebar";
import ShowHall from "../hall/showHall";
import OneClicks from "../checkup/OneClicks";
import CheckupTypes from "../checkup_types/checkupTypes";
import CheckupTypeShow from "../checkup_types/checkupTypeShow";
import ClinicInfo from "./clinicInfo";
import ChangeClinicInfo from "./changeClinicIfno";

class ClinicProfil extends Component {
    state = {main: <div></div>};

    changeClinicInfo = (e,clinicId) => {
        this.setState({main: <ChangeClinicInfo clinicId={clinicId}/>});
    };

    showClinicInfo = () => {
        this.setState({main: <ClinicInfo changeClinicInfo={this.changeClinicInfo}/>});
    };

    showType = (e,typeId,price,name) => {
        this.setState({main: <CheckupTypeShow typeId={typeId} name={name} price={price}/>});
    };

    showDoctors = () => {
        this.setState({main: <Doctors showDoctor={this.changeToShowDoctor}/>});
    };

    showHalls = () => {
        this.setState({main: <Halls showHall={this.changeToShowHall}/>});
    };

    changeToShowDoctor = (e, doctor) => {
        this.setState({main: <ShowDoctor doctor={doctor}/>});
    };

    changeToShowHall = (e, hall) => {
        this.setState({main: <ShowHall hall={hall}/>});
    };

    changeToOneClick = () => {
        this.setState({main: <OneClicks/>});
    };

    changeToTypes = () => {
        this.setState({main: <CheckupTypes showTypes={this.showType}/>});
    };

    render() {
        return (
            <div className="container-fluid pt-2">
                <div id="mainRow" className="row">
                    <Sidebar
                        links={[{id: 0, text: 'About',onClick:this.showClinicInfo}, {id: 1, text: 'Doctors', onClick: this.showDoctors}, {
                            id: 2,
                            text: 'Halls',
                            onClick: this.showHalls
                        }, {
                            id: 3,
                            text: 'Checkups',
                            onClick: this.changeToOneClick
                        }, {id: 4, text: 'Checkup types',onClick: this.changeToTypes}]}/>

                    <div className="col">{this.state.main}</div>
                </div>
            </div>
        );
    }
}

export default ClinicProfil;
