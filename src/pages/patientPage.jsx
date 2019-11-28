import React, {Component} from 'react';
import ListView from "../listView/listView";
import PatientSideBar from "./patientSideBar";

class PatientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mainComponent: <ListView/>
        }
    }

    openBrowseClinics = () => {
        this.setState({ mainComponent: <ListView/> });
    };

    render() {
        return (
            <div className="row">
                <div className="col-sm-2">
                    <PatientSideBar
                        openBrowseClinics={this.openBrowseClinics}
                    />
                </div>

                <div className="col">{this.state.mainComponent}</div>
            </div>
        );
    }
}

export default PatientPage;