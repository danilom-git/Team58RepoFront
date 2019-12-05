import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import PatientPage from "../patient/patientPage";

class App extends Component {
    render() {
        return (
            <>
                <Navbar title='Title' links={[{id: 1, text: 'Link'}, {id: 2, text: 'Other Link'}]}/>
                <PatientPage/>
            </>
        );
    }
}

export default App;