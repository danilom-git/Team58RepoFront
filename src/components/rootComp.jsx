import React, { Component } from "react";
import DoctorNav from "./doctorNav";
import Header from "./header";
import ClinicAdminNav from "./clinicAdminNav";

class RootComp extends Component {
    state = {};
    render() {
        return (
            <React.Fragment>
                <div class="row">
                    <div class="col">
                    <Header />
                    </div>
                </div>

                <div class="container-fluid m-0 p-0">
                    <div class="row">
                        <div class="col-sm-2">
                            <ClinicAdminNav />
                        </div>
                        <main class="col"></main>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RootComp;