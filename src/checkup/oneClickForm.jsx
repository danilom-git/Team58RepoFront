import React, {Component,} from 'react';
import Axios from "axios";
import DatePicker from "../generic_components/datepicker";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};


class OneClickForm extends Component {
    constructor(props) {
        super(props);
    };

    state = {
        responseText: "Checkup cannot be added.",
        clinicId: "",
        doctors: [],
        halls: [],
        types: [],
        type: {},
        oneClickCheckup: {},
        date: {},
        duration: "",
        startDate: "",
        endDate: "",
        doctor: {},
        hall: {},
        price: 0,
        disable: true,
        disableTime: true
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    //localStorage.getItem('token')}
    componentDidMount() {//get doctors,halls,types\
        let clinicAdmin;
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/one',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
        }).then((result) => {
            console.log(result);
            clinicAdmin = result.data;
            this.setState({clinicId:clinicAdmin.id});
            Axios.get('http://localhost:8080/api/doctors/all/clinic:' + clinicAdmin.id,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                this.setState({doctors: res.data});
                //  console.log(this.state.doctors);
            });

            Axios.get('http://localhost:8080/api/halls/all/clinic:' + clinicAdmin.id, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                this.setState({halls: res.data});
                //  console.log(this.state.halls);
            });

            Axios.get('http://localhost:8080/api/checkupTypes/all', {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                this.setState({types: res.data});
                //  console.log(this.state.halls);
            });

        });


    }

    getCheckupsOnDay = (e) => {//checkup date
        if (e.target.value) {
            this.setState({disable: true});
            this.setState({disableTime: false});
            let newDate  = new Date(e.target.value);
            this.setState({date: newDate});
            console.log(newDate);
        } else {
            this.setState({disable: true});
            this.setState({disableTime: true});
            this.setState({date: "" });

        }
    };

    changePrice = (e) => {  //SET PRICE
        console.log(e.target.value);
        this.setState({price: Number(e.target.value)});
    };

    handleDoctors = (e) => {// SET DOCTOR ID
        this.setState({doctor: e.target.value});
        //this.checkDoctor(e.target.value);
    };

    handleHalls = (e) => {// SET HALL ID
        this.setState({hall: e.target.value});
       // this.checkHall(e.target.value);
    };

    handleTypes = (e) => {// SET TYPE ID s
        this.setState({type: e.target.value});
    };

    changeStartTime = (e) => {
        if (e.target.value) {
            let str = e.target.value.toString();
            let minsSeks = str.split(':');
            let startTime = new Date(this.state.date.getFullYear(),this.state.date.getMonth(),this.state.date.getDate(),minsSeks[0],minsSeks[1]);
            console.log(this.state.date.getFullYear(),this.state.date.getMonth(),this.state.date.getDate());
            this.setState({startDate:startTime});

            if(this.state.endDate) {
                this.setState((prev) => ({disable: false}));
                let hdur = Number(this.state.endDate.getHours()) - Number(startTime.getHours());
                if(hdur !== 0)
                    hdur = hdur.toString() + "h";
                console.log(hdur);
                let mdur = Number(this.state.endDate.getMinutes()) - Number(startTime.getMinutes());
                if(mdur !== 0)
                    hdur = hdur.toString() + mdur.toString() + "min";
                console.log(hdur);
                this.setState((prev) => ({duration:hdur}));
            }
            else
                this.setState({disable: true});

        } else {
            this.setState({disable: true});
        }
    };

    changeEndTime = (e) => {
        if (e.target.value ) {
            let str = e.target.value.toString();
            let minsSeks = str.split(':');
            let endTime = new Date(this.state.date.getFullYear(),this.state.date.getMonth(),this.state.date.getDate(),minsSeks[0],minsSeks[1]);
            console.log(endTime);
            this.setState({endDate: endTime});

            if(this.state.startDate) {
                this.setState((prev) => ({disable: false}));
                let hdur = Number(endTime.getHours()) - Number(this.state.startDate.getHours());
                if(hdur !== 0)
                    hdur = hdur.toString() + "h";
                console.log(hdur);
                let mdur = Number(endTime.getMinutes()) - Number(this.state.startDate.getMinutes());
                if(mdur !== 0)
                    hdur = hdur.toString() + mdur.toString() + "min";
                console.log(hdur);
                this.setState((prev) => ({duration:hdur}));
            }
            else
                this.setState({disable: true});

        } else {
            this.setState({disable: true});
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.endDate > this.state.startDate) {
            if ((!this.state.disable) && (!this.state.disableTime) && (this.state.price > 0) && this.state.doctor && this.state.hall) {
                console.log("state iz submita", this.state);
                const postCheck = {
                    startTime: this.state.startDate,
                    endTime: this.state.endDate,
                    duration: this.state.duration,
                    price: this.state.price,
                    checkupTypeId: this.state.type,
                    hallId: this.state.hall,
                    doctorId: this.state.doctor,
                    clinicId: this.state.clinicId
                };
                console.log("za slanje", postCheck);
                Axios.post("http://localhost:8080/api/oneClickCheckup", postCheck,{
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }).then((res)=>{
                    console.log(res.data);
                },(error)=>{
                    this.setState(()=>({responseText: "Checkup cannot be added."}));
                    this.showModal();
                });
            }else
            {
                this.setState(()=>({responseText: "Form is not filed correctly."}));
                this.showModal();
            }
        }else {
            this.setState(()=>({responseText: "End time have to come after start time."}));
            this.showModal();
        }
    };

    render() {
        const types = this.state.types.map(type => (<option value={type.id} key={type.id}>{type.name}</option>));
        const doctors = this.state.doctors.map(doctor => (
            <option value={doctor.id} key={doctor.id}>{doctor.name + " " + doctor.lastName}</option>));
        const halls = this.state.halls.map(hall => (<option value={hall.id} key={hall.id}>{hall.name}</option>));
        return (<form>
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
                    <label>Checkup start:</label>
                </div>
                <div className="col-sm-4">
                    <input className="form-control" disabled={this.state.disableTime} onChange={this.changeStartTime}
                           type="time" min="07:00" max="19:00"/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Checkup end:</label>
                </div>
                <div className="col-sm-4">
                    <input className="form-control" disabled={this.state.disableTime} onChange={this.changeEndTime}
                           type="time" min="07:00" max="19:00"/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Doctor:</label>
                </div>
                <div className="col-sm-4">
                    <select onChange={this.handleDoctors} disabled={this.state.disable} className="form-control">
                        <option></option>
                        {doctors}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Hall:</label>
                </div>
                <div className="col-sm-4">
                    <select onChange={this.handleHalls} disabled={this.state.disable} className="form-control">
                        <option></option>
                        {halls}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Type:</label>
                </div>
                <div className="col-sm-4">
                    <select onChange={this.handleTypes} disabled={this.state.disable} className="form-control">
                        <option></option>
                        {types}</select>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-2 m-1">
                    <label>Price:</label>
                </div>
                <div className="col-sm-4">
                    <input onChange={this.changePrice} disabled={this.state.disable} className="form-control"
                           type="text"/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2 m-1">
                    <button className="btn btn-primary" onClick={(e) => this.handleSubmit(e)}>Set checkup</button>
                </div>
            </div>

            <Modal
                className="Modal__Bootstrap modal-dialog"
                closeTimeoutMS={150}
                isOpen={this.state.modal}
                style={customStyles}
                onRequestClose={this.handleModalCloseRequest}
            >
                <div className="modal-content" role="dialog">
                    <div className="modal-header">
                        <h4 className="modal-title">Notification</h4>
                        <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{this.state.responseText}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                onClick={this.handleModalCloseRequest}>Close
                        </button>
                    </div>
                </div>
            </Modal>
        </form>);
    }
}

export default OneClickForm;
