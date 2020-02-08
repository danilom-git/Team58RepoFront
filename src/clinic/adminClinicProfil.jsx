import React, {Component} from "react";
import Sidebar from "../generic_components/sidebar";
import AbsenceRequests from "../doctor/absenceRequests";
import CheckupRequests from "../checkup/checkupRequests";
import SearchHall from "../hall/searchHall";
import OneClickForm from "../checkup/oneClickForm";
import HallAddForm from "../hall/hallAddForm";
import DoctorAddForm from "../doctor/doctorAddForm";
import AddCheckupType from "../checkup/addCheckupType";

class AdminClinicProfil extends Component {

    state = {
        x: "",
        y: "",
        main: <div>

        </div>
    };

    componentDidMount() {
        this.setState({x:45.29});
        this.setState({y:19.83});
    }

    changeToAddCheckupType = () => {
        this.setState({main: <AddCheckupType />});
    };

    changeToAddDoctor = () => {
        this.setState({main: <DoctorAddForm/>});
    };

    changeToAddHall = () => {
        this.setState({main: <HallAddForm/>});
    };

    changeToOneClickForm = () => {
        this.setState({main: <OneClickForm/>});
    };

    changeToSearchHall = (requestId) => {
        this.setState({main: <SearchHall changeToRequests={this.changeToCheckupRequests} requestId={requestId}/>});
    };

    changeToRequests = () => {
        this.setState({main: <AbsenceRequests/>});
    };

    changeToCheckupRequests = () => {
        this.setState({main: <CheckupRequests changeToSearchHall={this.changeToSearchHall}/>});
    };

    render() {

        return (
            <div className="container-fluid pt-2">
                <div className="row">

                    <Sidebar links={[{id: 1, text: "User profile"}, {
                        id: 2,
                        text: "Clinic profile",
                        onClick: this.props.changeToClinic
                    }, {id: 3, text: "Clinic report"}, {
                        id: 4,
                        text: "Absence requests",
                        onClick: this.changeToRequests
                    }, {id: 5, text: "Checkup requests", onClick: this.changeToCheckupRequests}, {
                        id: 6,
                        text: "Add doctor",
                        onClick: this.changeToAddDoctor
                    }, {id: 7, text: "Add hall", onClick: this.changeToAddHall}, {
                        id: 8,
                        text: "Add checkup",
                        onClick: this.changeToOneClickForm
                    },{
                        id: 9,
                        text: "Add checkup type",
                        onClick: this.changeToAddCheckupType
                    }]}
                    />

                    <div className="col">{this.state.main}</div>
                </div>

            </div>
        );
    }
}

export default AdminClinicProfil;
