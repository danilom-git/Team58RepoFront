import React from "react";
import ClinicProfil from "./components/clinicProfil";
//import AdminClinicProfil from "./components/adminClinicProfil";
import Header from "./components/header";
import ListView from "./listView/listView";
import PatientPage from "./pages/patientPage";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: <ClinicProfil />,
            title: 'Clinic'
        };
    }

    openClinicPage = () => {
        this.setState({ page: <ClinicProfil />, title: 'Clinic' });
    };

    openPatientPage = () => {
        this.setState( { page: <PatientPage />, title: 'Patient' })
    };

    render() {
        return (
            <div className="container-fluid m-0 p-0">
                <div className="row">
                    <div className="col">
                        <Header title={this.state.title} openClinicPage={this.openClinicPage} openPatientPage={this.openPatientPage}/>
                    </div>
                </div>

                {this.state.page}
            </div>
        );
    }
}

export default App;
