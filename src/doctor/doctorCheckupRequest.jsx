import React, {Component} from "react";
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";

class DoctorCheckupRequest extends Component {

    constructor(props) {
        super(props);
        this.state.patient = this.props.patient;
    }

    state = {
        doctor: {},
        patient: {},
        startDate: "",
        endDate:"",
        date:"",
        checkup: {}
    };

    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/doctors/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then((res) => {
            this.setState({doctor: res.data});
            console.log(this.state);
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/checkups/checkStart/patient:'+this.props.patient.id+'/doctor:'+res.data.id,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res)=>{
                console.log(res.data);
                if(!res.data)
                    this.props.changeToPatient("",this.props.patient.id);
                else
                    this.setState({checkup:res.data});
            });
        });
    }

    changeDate = (e) => {
        this.setState({date:new Date(e.target.value)});
    };

    changeStartDate = (e) => {
        let spl = e.target.value.toString().split(':');
        let startDate = this.state.date;
        startDate.setHours(Number(spl[0]));
        startDate.setMinutes(Number(spl[1]));
        console.log(startDate);
        this.setState({startDate:startDate});
    };

    changeEndDate = (e) => {
        let spl = e.target.value.toString().split(':');
        let endDate = this.state.date;
        endDate.setHours(Number(spl[0]));
        endDate.setMinutes(Number(spl[1]));
        console.log(endDate);
        this.setState({endDate:endDate});
    };

    handleSubmit = () => {
        console.log(this.state);
        let data = {
            clinicId: this.state.checkup.clinicId,
            patientId: this.state.patient.id,
            checkupTypeId: this.state.checkup.checkupTypeId,
            doctorId: this.state.doctor.id,
            startDate: this.state.startDate,
            endDate: this.state.endDate
        };
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/checkupRequests',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data:data
        }).then((res)=>{
            console.log(res.data);
        });
    };


    render() {
        return (<div className="col">
            <div className="row">
                <div className="col-sm-4">
                    <DatePicker onChange={this.changeDate}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    Start time:
                    <input onChange={this.changeStartDate} className="form-control" type="time" min="07:00" max="19:00"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    End time:
                    <input onChange={this.changeEndDate} className="form-control" type="time" min="07:00" max="19:00"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <button onClick={this.handleSubmit} className="btn btn-primary">Send</button>
                </div>
            </div>

        </div>);
    }

}

export default DoctorCheckupRequest;