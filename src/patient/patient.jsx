import React, { Component } from "react";
import Axios from "axios";

class Patient extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        patient : {}
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/patients/id:" + this.props.patient).then(res => {
            this.setState((prevState) => ({patient: res.data}));
            console.log(this.state.patient);
        });
    }

    render() {
        return (<div className="col">
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <button className='btn btn-primary'>
                            Medical record
                        </button>
                    </div>
            </div>
                <div className="col">
                    <div className="text-center">
                        <button className='btn btn-primary'>
                            Checkup start
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Patient;