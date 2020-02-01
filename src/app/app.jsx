import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import AdminClinicProfil from "../clinic/adminClinicProfil";
import ClinicProfil from "../clinic/clinicProfil";
import DoctorProfil from "../doctor/doctorProfil";
import PatientPage from "../patient/patientPage";
import LoginPage from "./loginPage";
import Axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: this.usrLoggedOut
        };
    }

    usrLoggedOut = 'loggedOut';
    usrPatient = 'patient';
    usrDoctor = 'doctor';
    usrClinicAdmin = 'clinicAdmin';

    getTitle = (userType) => {
        switch (userType) {
            case this.usrPatient: return 'Patient';
            case this.usrDoctor: return 'Doctor';
            case this.usrClinicAdmin: return 'Clinic Admin';

            default: return 'Logged out';
        }
    };

    componentDidMount() {
        let userType = localStorage.getItem('userType');
        if (userType)
            this.setState({ userType: userType });
    }

    changeToClinic = () => {
        this.setState({profil: <ClinicProfil admin={this.state.user}/>});
        this.setState({title: "Clinic"});
    };

    onLogIn = (userType, token) => {
        this.setState({ userType: userType });
        localStorage.setItem('userType', userType);
        localStorage.setItem('token', token);
    };

    onLogOut = () => {
        localStorage.removeItem('userType');
        localStorage.removeItem('token');
        this.setState({ userType: this.usrLoggedOut });
    };

    render() {
        return (
            <>
                <Navbar title={this.getTitle(this.state.userType)}
                        links={[
                            {id: 1, text: 'Log Out', onClick: this.onLogOut}
                            ]}
                />
                {
                    this.state.userType === this.usrPatient ?
                        <PatientPage/>
                    : this.state.userType === this.usrDoctor ?
                        <DoctorProfil/>
                    : this.state.userType === this.usrClinicAdmin ?
                        <ClinicProfil changeToClinic={this.changeToClinic} />
                    :
                        <LoginPage onLogIn={this.onLogIn}/>
                }
            </>
        );
    }
}

export default App;
