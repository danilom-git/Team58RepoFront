import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import AdminClinicProfil from "../clinic/adminClinicProfil";
import ClinicProfil from "../clinic/clinicProfil";
import DoctorProfil from "../doctor/doctorProfil";
import PatientPage from "../patient/patientPage";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profil: <AdminClinicProfil changeToClinic={this.changeToClinic} />,
            title: ""
        };

    }

    changeToClinic = () => {
        this.setState({ profil: <ClinicProfil /> });
        this.setState({title:"Clinic"});
    };

    changeToClinicAdmin = () => {
        this.setState({ profil: <AdminClinicProfil changeToClinic={this.changeToClinic} />});
        this.setState({title:"Clinic admin"});
    };

    changeToPatientPage = () => {
        this.setState({ profil: <PatientPage />});
        this.setState({title:"Patient"});
    };

    changeToDocotorPage = () => {
        this.setState( (prevState) => ({
            profil: <DoctorProfil />,
            title: "Doctor"
        }));

    };

    render() {
        return (
            <>
                <Navbar title={this.state.title} links={[{id: 1, text: 'djoda',onClick:this.changeToClinicAdmin}, {id: 2, text: 'djanilo',onClick:this.changeToPatientPage}, {id: 3, text: 'doctor',onClick:this.changeToDocotorPage}]}/>
                {this.state.profil}
            </>
        );
    }
}

export default App;