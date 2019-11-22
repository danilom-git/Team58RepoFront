import React, { Component } from "react";
import DoctorNav from "./doctorNav";
import Header from "./header";
import ClinicAdminNav from "./clinicAdminNav";
import MainComp from "./mainComp";
import { Provider } from 'react-redux';
import store from '../store';
import Doctors from "./doctors"

class RootComp extends Component {
    constructor(props){
        super(props);
        this.clinicAdminRef = React.createRef();
    }

    render() {
        return (

            <Provider store={store}>
                <div className="row">
                    <div className="col">
                    <Header />
                    </div>
                </div>

                <div className="container-fluid m-0 p-0">
                    <div className="row">
                        <div className="col-sm-2">
                            <ClinicAdminNav ref={this.clinicAdminRef} toRender={true} />}
                        </div>

                            <Doctors />

                    </div>
                </div>
            </Provider>
        );
    }
}

export default RootComp;