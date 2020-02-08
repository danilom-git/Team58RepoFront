import React, {Component} from 'react';
import Axios from "axios";

class DoctorInfo extends Component{

    state = {
        doctor: {},
        name:"",
        lastName:""
    };

    componentDidMount() {
        Axios({/// get doctor
            method: 'get',
            url: 'http://localhost:8080/api/doctors/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then((res) => {
            this.setState({doctor:res.data});
        });
    }

    onChangeName = (e) =>{
        console.log(this.state);
        this.setState({doctor:{...this.state.doctor,name:e.target.value}});
    };

    onChangeLastName = (e) =>{
        this.setState({doctor:{...this.state.doctor,lastName:e.target.value}});
    };

    handleSubmit = () =>{
        Axios({
            method: 'put',
            url: 'http://localhost:8080/api/doctors',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: this.state.doctor
        }).then(res => {
            console.log(res.data);
        });
    };

    render() {
        return (<div className="col">
            <div className="row">
                <div className="col">Name:</div>
                <div className="col">
                    <input onChange={this.onChangeName} className="form-control" type="text" value={this.state.doctor.name}/>
                </div>
            </div>
            <div className="row">
                <div className="col">Last name:</div>
                <div className="col">
                    <input onChange={this.onChangeLastName} className="form-control" type="text" value={this.state.doctor.lastName}/>
                </div>
            </div>
            <div className="row">
                <div className="col">Email:</div>
                <div className="col">
                    <input disabled={true} className="form-control" type="text" value={this.state.doctor.email}/>
                </div>
            </div>
            <div className="row">
                <div className="col">Working hours:</div>
                <div className="col">
                    <input disabled={true} className="form-control" type="text" value={this.state.doctor.workingTime}/>
                </div>
            </div>
            <div className="row">
                <div className="col">Clinic:</div>
                <div className="col">
                    <input disabled={true} className="form-control" type="text" value={this.state.doctor.clinicName}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Change</button>
                </div>
            </div>
        </div>);
    }

}export default DoctorInfo;