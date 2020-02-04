import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import AdminClinicProfil from "../clinic/adminClinicProfil";
import ClinicProfil from "../clinic/clinicProfil";
import DoctorProfil from "../doctor/doctorProfil";
import PatientPage from "../patient/patientPage";
import LoginPage from "./loginPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: this.usrLoggedOut,
            profil: <AdminClinicProfil changeToClinic={this.changeToClinic} />

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
        this.setState({profil: <ClinicProfil />});
        this.setState({title: "Clinic"});
    };

    onLogIn = (userType, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userType', userType);
        this.setState({ userType: userType });
    };

    onLogOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        this.setState({ userType: this.usrLoggedOut });
    };


    render() {
        let links = undefined;
        if (this.state.userType !== this.usrLoggedOut)
            links = [{id: 1, text: 'Log Out', onClick: this.onLogOut}];

        return (
            <>
                <Navbar title={this.getTitle(this.state.userType)}
                    links={links}
                />
                {
                    this.state.userType === this.usrPatient ?
                        <PatientPage/>
                    : this.state.userType === this.usrDoctor ?
                        <DoctorProfil/>
                    : this.state.userType === this.usrClinicAdmin ?
                        this.state.profil
                    :
                        <LoginPage onLogIn={this.onLogIn}/>
                }
            </>
        );
    }
}

export default App;
