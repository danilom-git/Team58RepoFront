import React, { Component } from "react";
import Axios from "axios";

class Patient extends Component{
    state = {
        patient : {}
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/patients/id:" + this.props.patient,{
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6ImRvY3RvcjAxQHNvbWVtYWlsLmNvbSIsImF1ZCI6IndlYiIsImlhdCI6MTU3NjQyNDI2OSwiZXhwIjoxNTc5MDE2MjY5fQ.alvmCZRVm_FctN7kVoknRETlJAmKWCmqoU3jbUmr8MRi0DkbWjX6z-rKfxV7NnkPzPiyhHn4_NWqxVoMW3euXQ"
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
