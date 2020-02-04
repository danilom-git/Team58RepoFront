import React, {Component} from "react";
import Axios from "axios";
import Modal from 'react-modal';
import DatePicker from "../generic_components/datepicker";

class Absence extends Component {

    state = {
        startDate: "",
        endDate: "",
        type: "",
        doctorId: "",
        clinicId: ""
    };

    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/doctors/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({doctorId: res.data.id});
            this.setState({clinicId: res.data.clinicId});
            console.log(res.data);
        });
    }

    startDateChange = (e) => {
        this.setState({startDate: new Date(e.target.value)});
    };

    endDateChange = (e) => {
        this.setState({endDate: new Date(e.target.value)});
    };

    typeChange = (e) => {
        this.setState({type: e.target.value});
    };

    handleSubmit = () => {
        console.log(this.state);
        if (this.state.startDate.getTime() < this.state.endDate.getTime()) {
            if (this.state.type) {
                Axios({
                    method: 'post',
                    url: 'http://localhost:8080/api/absenceRequests',
                    headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                    data: {
                        doctorId: this.state.doctorId,
                        clinicId: this.state.clinicId,
                        startDate: this.state.startDate,
                        endDate: this.state.endDate,
                        type: this.state.type,
                        answered: false
                    }
                }).then((res) => {
                    console.log(res.data);
                });
            }

        }

    };

    render() {
        return (
            <div className="col">
                <div className="row">
                    <div className="col">
                        <DatePicker labelText="Start date" className="form-control" onChange={this.startDateChange}/>
                    </div>
                    <div className="col">
                        <DatePicker labelText="End date" className="form-control" onChange={this.endDateChange}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input onChange={this.typeChange} type="radio" name="type"
                               value="absence"/><label>Absence</label><br></br>
                        <input onChange={this.typeChange} type="radio" name="type" value="annualLeave"/> <label>Annual
                        leave</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button onClick={this.handleSubmit} className="btn btn-primary">Send request</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Absence;