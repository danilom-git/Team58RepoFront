import React, {Component,} from 'react';
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";


class OneClickForm extends Component{
    constructor(props) {
        super(props);
    };

    state = {
        checkupsOneDay: [],
        doctors: [],
        halls: [],
        types:[],
        type:{},
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
    };

    componentDidMount() {//get doctors,halls,types
        Axios.get('http://localhost:8080/api/doctors/all').then((res) => {
            this.setState({doctors:res.data});
          //  console.log(this.state.doctors);
        });

        Axios.get('http://localhost:8080/api/halls/all').then((res) => {
            this.setState({halls:res.data});
          //  console.log(this.state.halls);
        });

        Axios.get('http://localhost:8080/api/checkupTypes/all').then((res) => {
            this.setState({types:res.data});
            //  console.log(this.state.halls);
        });
    }

    getCheckupsOnDay = (e) => {//checkups for one day
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
    };

    changePrice = (e) => {  //SET PRICE
        console.log(e.target.value);
        this.setState({price:Number(e.target.value)});
    };

    handleDoctors = (e) => {// SET DOCTOR ID
       this.setState({doctor:e.target.value});
       this.checkDoctor(e.target.value);
    };

    handleHalls = (e) => {// SET HALL ID
        this.setState({hall:e.target.value});
        this.checkHall(e.target.value);
    };

    handleTypes = (e) => {// SET TYPE ID s
        this.setState({type:e.target.value});
    };

    checkDoctor = (id) => {

        for(let d of this.state.checkupsOneDay)
        {
            if(id === d.doctorId.toString())
            {
                console.log(d.doctorId);
                let sp1 = d.startDate.split(".");
                let dStartDate = new Date(sp1[0]);
                let sp2 = d.endDate.split(".");
                let dEndDate = new Date(sp2[0]);

                console.log(dStartDate.getTime(),"za ",dStartDate,this.state.startDate.getTime(),"za",this.state.startDate);

                if((this.state.startDate.getTime() <= dStartDate.getTime() && this.state.endDate.getTime() <= dStartDate.getTime())||(this.state.startDate.getTime() >= dEndDate.getTime() && this.state.endDate.getTime() >= dEndDate.getTime()))
                {
                    console.log("OK DOCTOR");
                }else
                {
                    this.setState({doctor:false});
                    console.log("NIJE OK DOCTOR");
                    break;
                }
            }else
            {
                console.log("NIJE ID");
            }
        }

    };

    checkHall = (id) => {
        for(let d of this.state.checkupsOneDay)
        {
            if(id === d.hallId.toString())
            {
                console.log(d.hallId);

                let sp1 = d.startDate.split(".");
                let dStartDate = new Date(sp1[0]);
                let sp2 = d.endDate.split(".");
                let dEndDate = new Date(sp2[0]);

                console.log(dStartDate.getTime(),this.state.startDate.getTime());

                if((this.state.startDate.getTime() <= dStartDate.getTime() && this.state.endDate.getTime() <= dStartDate.getTime())||(this.state.startDate.getTime() >= dEndDate.getTime() && this.state.endDate.getTime() >= dEndDate.getTime()))
                {
                    console.log("OK SALA");
                }else
                {
                    this.setState({hall:false});
                    console.log("NIJE OK SALA");
                    break;
                }
            }else
            {
                console.log("NIJE ID");
            }
        }
    };

    trigDisableTrue = () => {
        this.setState({disable:false});
    };

    changeStartTime = (e) => {
        //(this.state.date + "T" + e.target.value + ":00.000+0000")
        let dateString = this.state.date + "T" + e.target.value + ":00";
        console.log(dateString);
        if(e.target.value) {
            this.setState({startDate: new Date(dateString)});
            if (this.state.endDate) {
                this.trigDisableTrue();
            }
        }else{
            this.setState({disable:true});
        }
    };

    changeEndTime = (e) => {
        let dateString = this.state.date + "T" + e.target.value + ":00";
        if(e.target.value) {
            this.setState({endDate: new Date(dateString)});
            if (this.state.startDate)
                this.trigDisableTrue();
        }else{
            this.setState({disable:true});
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        if((!this.state.disable) && (!this.state.disableTime) && this.state.price && this.state.doctor && this.state.hall)
        {
            console.log("state iz submita",this.state);
            const postCheck = {
                startTime: this.state.startDate,
                endTime: this.state.endDate,
                duration: 0,
                price:this.state.price,
                checkupTypeId:this.state.type,
                hallId:this.state.hall,
                doctorId:this.state.doctor,
                clinicId: 1
            };
            console.log("za slanje",postCheck);
            Axios.post("http://localhost:8080/api/oneClickCheckup", postCheck).then(function (
                res
            ) {
                console.log("posle posta", res);
            });
        }
    };

    render() {
        const types = this.state.types.map(type => (<option value={type.id} key={type.id}>{type.name}</option>));
        const doctors = this.state.doctors.map(doctor => (<option value={doctor.id} key={doctor.id}>{doctor.name + " " + doctor.lastName}</option>));
        const halls = this.state.halls.map(hall => (<option value={hall.id} key={hall.id}>{hall.name}</option>));
        return(<form>
            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Checkup date:</label>
                </div>
                <div className="col-sm-4">
                   <DatePicker onChange={this.getCheckupsOnDay}/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label >Checkup start:</label>
                </div>
                <div className="col-sm-4">
                    <input className="form-control" disabled={this.state.disableTime}  onChange={this.changeStartTime} type="time" min="07:00" max="19:00"   />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Checkup end:</label>
                </div>
                <div className="col-sm-4">
                    <input className="form-control"  disabled={this.state.disableTime}  onChange={this.changeEndTime} type="time" min="07:00" max="19:00"   />
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Doctor:</label>
                </div>
                <div className="col-sm-4">
                    <select  onChange={this.handleDoctors}  disabled = {this.state.disable} className="form-control"><option></option>{doctors}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Hall:</label>
                </div>
                <div className="col-sm-4">
                    <select onChange={this.handleHalls}  disabled = {this.state.disable} className="form-control"><option ></option>{halls}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Type:</label>
                </div>
                <div className="col-sm-4">
                    <select onChange={this.handleTypes} disabled = {this.state.disable} className="form-control" ><option></option>{types}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Price:</label>
                </div>
                <div className="col-sm-4">
                    <input onChange={this.changePrice} disabled = {this.state.disable} className="form-control" type="text" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2 m-1">
                    <button className='btn btn-primary' onClick={(e) => this.handleSubmit(e)}>Set checkup</button>
                </div>
            </div>
        </form>);
    }
}
export default OneClickForm;
