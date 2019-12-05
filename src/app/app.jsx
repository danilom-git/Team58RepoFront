import React, {Component,} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../generic_components/navbar";
import PatientPage from "../patient/patientPage";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: 'Patient Page',
            page: <PatientPage />
        }
    }

    setTitle = (title) => {
        this.setState( {title: title} );
    };

    render() {
        return (
            <>
                <Navbar title={this.state.title} links={[{id: 1, text: 'Link'}, {id: 2, text: 'Other Link'}]}/>
                {this.state.page}
            </>
        );
    }
}

export default App;