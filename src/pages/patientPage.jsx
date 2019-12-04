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
            <div className='row no-gutters'>
                <div className='col-2 border border-primary'>
                    <PatientSideBar
                        openBrowseClinics={this.openBrowseClinics}
                    />
                </div>
                <div className="col border border-primary">
                    {/*{this.state.mainComponent}*/}
                    <p>
                        prvi red je ovde
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet
                        yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet yeet

                    </p>
                </div>
            </div>
        );
    }
}

export default PatientPage;