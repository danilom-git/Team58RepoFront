import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import PageTemplate from "./pageTemplate";
import AdminClinicProfil from "../components/adminClinicProfil";
import ClinicProfil from "../components/clinicProfil";
import DoctorProfil from "../components/doctorProfil";
import PatientPage from "../patient/patientPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profil: <AdminClinicProfil changeToClinic={this.changeToClinic} />
        };

    }

    changeToClinic = () => {
        this.setState({ profil: <ClinicProfil /> });
    };

    changeToClinicAdmin = () => {
        this.setState({ profil: <AdminClinicProfil changeToClinic={this.changeToClinic} />});
    }

    changeToPatientPage = () => {
        this.setState({ profil: <PatientPage />});
    }

    render() {
        return (
            <>
                <Navbar title='Title' links={[{id: 1, text: 'Link',onClick:this.changeToClinicAdmin}, {id: 2, text: 'Other Link',onClick:this.changeToPatientPage}]}/>
                {this.state.profil}
            </>
        );
    }
}

export default App;