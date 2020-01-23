import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import AdminClinicProfil from "../clinic/adminClinicProfil";
import ClinicProfil from "../clinic/clinicProfil";
import DoctorProfil from "../doctor/doctorProfil";
import PatientPage from "../patient/patientPage";
import LoginPage from "./loginPage";
import DoctorProfil from "../components/doctorProfil";
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


    componentDidMount() {
        let userType = localStorage.getItem('userType');
        if (userType)
            this.setState({ userType: userType });
    }

    changeToClinic = () => {
        this.setState({profil: <ClinicProfil admin={this.state.user}/>});
        this.setState({title: "Clinic"});
    };

    changeToClinicAdmin = () => {
        Axios.get("http://localhost:8080/api/clinicAdmins/1",{
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6InBhdGllbnQwMUBzb21lbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1NzYyMTkyNjQsImV4cCI6MTU3ODgxMTI2NH0.0eSK1sd_Qoks0_W0zRWnj3yOKXUI3H5TJkIlXZ2nfa_AljSV_B4KSJCAEXyKYYeRgn2tIQxU0HxfOE_LCgoypQ"
            }
        }).then((res) => {
            this.setState({user: res.data});
            console.count(res.data);
        });
        this.setState({profil: <AdminClinicProfil admin={this.state.user} changeToClinic={this.changeToClinic}/>});
        this.setState({title: "Clinic admin"});
    };

    changeToPatientPage = () => {
        this.setState({profil: <PatientPage/>});
        this.setState({title: "Patient"});
    };

    changeToDocotorPage = () => {
        Axios.get("http://localhost:8080/api/doctors/1").then((res) => {
            this.setState({user: res.data});
            console.count(res.data);
        });
        this.setState((prevState) => ({
            profil: <DoctorProfil doctor={this.state.user}/>,
            title: "Doctor"
        }));

    };

    onLogIn = (userType, token) => {
        this.setState({ userType: userType });
        localStorage.setItem('userType', userType)
        localStorage.setItem('token', token);
    };

    render() {
        return (
            <>
                <Navbar title={this.state.title}
                        links={[{id: 1, text: 'Clinic Admin', onClick: this.changeToClinicAdmin}, {
                            id: 2,
                            text: 'Patient',
                            onClick: this.changeToPatientPage
                        }, {id: 3, text: 'Doctor', onClick: this.changeToDocotorPage}]}/>
                {this.state.profil}
                <Navbar title='Title' links={[{id: 1, text: 'djoda',onClick:this.changeToClinicAdmin}, {id: 2, text: 'djanilo',onClick:this.changeToPatientPage}]}/>
                {
                    this.state.userType === this.usrLoggedOut ?
                        <LoginPage onLogIn={this.onLogIn}/>
                    :
                    this.state.userType === this.usrPatient ?
                        <PatientPage/>
                    :
                        <ClinicProfil/>
                }
            </>
        );
    }
}

export default App;
