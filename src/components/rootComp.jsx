import React, { Component } from "react";
import DoctorNav from "./doctorNav";
import Header from "./header";
import ClinicAdminNav from "./clinicAdminNav";

class RootComp extends Component {
    constructor(props){
        super(props);
    }

    state = {
        tip: "adminKlinike"
    };

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col">
                    <Header />
                    </div>
                </div>

                <div className="container-fluid m-0 p-0">
                    <div className="row">
                        <div className="col-sm-2">
                            {(this.state.tip === "adminKlinike") && <ClinicAdminNav toRender={true} />}
                            {(this.state.tip === "doktor")&&<DoctorNav toRender={true}/>}
                        </div>
                        <main className="col"></main>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default RootComp;