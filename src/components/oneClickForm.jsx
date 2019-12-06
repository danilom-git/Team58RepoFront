import React, {Component,} from 'react';
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";


class OneClickForm extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        checkupsOneDay: [],
        doctors: [],
        halls: [],
        types:[],
        oneClickCheckup:{},
        date:{},
        duration:{},
        startDate:"",
        endDate:"",
        doctor: {},
        hall:{},
        price:0,
        disable:true,
        disableTime:true
    }

    componentDidMount() {
        Axios.get('http://localhost:8080/api/doctors/all').then((res) => {
            this.setState({doctors:res.data});
          //  console.log(this.state.doctors);
        })

        Axios.get('http://localhost:8080/api/halls/all').then((res) => {
            this.setState({halls:res.data});
          //  console.log(this.state.halls);
        })

        Axios.get('http://localhost:8080/api/checkupTypes/all').then((res) => {
            this.setState({types:res.data});
            //  console.log(this.state.halls);
        })
    }

    getCheckupsOnDay = (e) => {
        if (e.target.value) {
            Axios.get("http://localhost:8080/api/checkups/allOnDate/" + e.target.value).then((res) => {
                this.setState({checkupsOneDay: res.data});
                this.setState({disableTime: false});
                console.log(this.state.checkupsOneDay);

            });
            this.setState({date: e.target.value});
        } else {
            this.setState({disable:true});
            this.setState({disableTime: true});
        }
    }

    changePrice = (e) => {
        console.log(e.target.value);
        this.setState({price:e.target.value});
    }

    handleDoctors = (e) => {
        this.setState({doctor:e.target.value});
    }

    handleHalls = (e) => {
        this.setState({hall:e.target.value});
    }

    handleTypes = (e) => {
        this.setState({type:e.target.value});
    }

    checkDoctor = () => {
        for(let d in this.state.checkupsOneDay)
        {
            //if(this.state.doctor)
        }
    }

    checkHall = () => {

    }

    trigDisableTrue = () => {
        this.setState({disable:false});

    }

    changeStartTime = (e) => {
        if(e.target.value) {
            this.setState({startDate: (this.state.date + "T" + e.target.value + ":00.000+0000")});
            if (this.state.endDate) {
                this.trigDisableTrue();
            }
        }else{
            this.setState({disable:true});
        }
    }

    changeEndTime = (e) => {
        if(e.target.value) {
            this.setState({endDate: (this.state.date + "T" + e.target.value + ":00.000+0000")});
            if (this.state.startDate)
                this.trigDisableTrue();
        }else{
            this.setState({disable:true});
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if((!this.state.disable) && (!this.state.disableTime) && this.state.price)
        {

        }
    }

    render() {
        const types = this.state.types.map(type => (<option value={type} key={type.id}>{type.name}</option>));
        const doctors = this.state.doctors.map(doctor => (<option value={doctor} key={doctor.id}>{doctor.name + " " + doctor.lastName}</option>));
        const halls = this.state.halls.map(hall => (<option value={hall} key={hall.id}>{hall.name}</option>));
        return(<form>
            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Checkup date:</label>
                </div>
                <div col="col-sm-4">
                   <DatePicker onChange={this.getCheckupsOnDay}/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label >Checkup start:</label>
                </div>
                <div col="col-sm-4">
                    <input disabled={this.state.disableTime}  onChange={this.changeStartTime} type="time" min="07:00" max="19:00"   />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Checkup end:</label>
                </div>
                <div col="col-sm-4">
                    <input  disabled={this.state.disableTime}  onChange={this.changeEndTime} type="time" min="07:00" max="19:00"   />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Doctor:</label>
                </div>
                <div col="col-sm-4">
                    <select onChange={this.handleDoctors} disabled = {this.state.disable} className="form-control">{doctors}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Hall:</label>
                </div>
                <div col="col-sm-4">
                    <select onChange={this.handleHalls} disabled = {this.state.disable} className="form-control">{halls}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Type:</label>
                </div>
                <div col="col-sm-4">
                    <select onChange={this.handleTypes} disabled = {this.state.disable} >{types}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Price:</label>
                </div>
                <div col="col-sm-4">
                    <input onChange={this.changePrice} disabled = {this.state.disable} className="form-control" type="text" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2 m-1">
                    <button  onClick={(e) => this.handleSubmit(e)}>Set checkup</button>
                </div>
            </div>
        </form>);
    }
}
export default OneClickForm;