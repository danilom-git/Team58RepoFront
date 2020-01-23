import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import AdminClinicProfil from "../components/adminClinicProfil";
import ClinicProfil from "../components/clinicProfil";
import PatientPage from "../patient/patientPage";
import LoginPage from "./loginPage";
import DoctorProfil from "../components/doctorProfil";

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
        this.setState({ page: <ClinicProfil /> });
    };

    changeToClinicAdmin = () => {
        this.setState({ page: <AdminClinicProfil changeToClinic={this.changeToClinic} />});
    };

    changeToPatientPage = () => {
        this.setState({ page: <PatientPage />});
    };

    onLogIn = (userType, token) => {
        this.setState({ userType: userType });
        localStorage.setItem('userType', userType)
        localStorage.setItem('token', token);
    };

    render() {
        return (
            <>
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
