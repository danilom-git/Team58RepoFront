import React, { Component } from "react";
import Axios from "axios";

class Patient extends Component{
    state = {
        patient : {}
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/patients/id:" + this.props.patient,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
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
                        <button onClick={(e)=> this.props.changeToDoctorRequest(e,this.state.patient)} className='btn btn-primary'>
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
