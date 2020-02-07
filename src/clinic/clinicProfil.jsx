import React, {Component} from "react";
import Doctors from "../doctor/doctors";
import Halls from "../hall/halls";
import ShowDoctor from "../doctor/showDoctor";
import Sidebar from "../generic_components/sidebar";
import ShowHall from "../hall/showHall";
import OneClicks from "../checkup/OneClicks";

class ClinicProfil extends Component {
    state = {main: <div></div>};

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

    render() {
        //<ClinicProfilNav showHalls={this.showHalls} changeToAddHall={this.changeToAddHall} showDoctors={this.showDoctors} changeToAddDoctor={this.changeToAddDoctor} />
        return (
            <div className="container-fluid pt-2">
                <div id="mainRow" className="row">
                    <Sidebar
                        links={[{id: 1, text: 'Doctors', onClick: this.showDoctors}, {
                            id: 2,
                            text: 'Halls',
                            onClick: this.showHalls
                        }, {
                            id: 3,
                            text: 'Checkups',
                            onClick: this.changeToOneClick
                        }, {id: 4, text: 'Checkup types'}]}/>

                    <div className="col">{this.state.main}</div>
                </div>
            </div>
        );
    }
}

export default ClinicProfil;
