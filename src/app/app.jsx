import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import PageTemplate from "./pageTemplate";
import AdminClinicProfil from "../components/adminClinicProfil";
import ClinicProfil from "../components/clinicProfil";
import DoctorProfil from "../components/doctorProfil";

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

    render() {
        return (
            <>
                <Navbar title='Title' links={[{id: 1, text: 'Link'}, {id: 2, text: 'Other Link'}]}/>
                {this.state.profil}
            </>
        );
    }
}

export default App;