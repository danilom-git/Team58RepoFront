import React, { Component } from "react";
import Axios from "axios";

class ShowDoctor extends Component{
    constructor(props) {
        super(props);
        this.state.id = this.props.doctor.id;
        this.state.doctor = this.props.doctor;
    }

    state = {
        id : "",
        doctor: {}
    }

    componentDidMount() {
        Axios.get("http://localhost:8080/api/doctors/" + this.state.id).then(res => {
            this.setState({doctor:res.data});
        });
    }

    handleChangeIme = event => {
        this.setState({ doctor : {...this.state.doctor,name : event.target.value} });
    };

    handleChangePrezime = event => {
        this.setState({ doctor : {...this.state.doctor,lastName : event.target.value} });
    };

    handleChangeRadnoVreme = event => {
        this.setState({ doctor : {...this.state.doctor,workingTime : event.target.value} });
    };

    handleSubmit = () => {
        //name,lastName moraju da odgovaraju dto
        console.log( this.state.doctor);
        if(this.state.doctor.name && this.state.doctor.lastName && this.state.doctor.workingTime != 0) {
            const postDoctor = this.state.doctor;
            console.log("pre posta", postDoctor);
            Axios.put("http://localhost:8080/api/doctors", postDoctor).then(function (
                res
            ) {
                console.log("posle posta", res);
            });
        }
    };

    render() {
        return (<form>
            <div className="row">
                <div className="col-sm-2">
                    <label>Name:</label>
                </div>
                <div col="col-sm-4">
                    <input type="text" onChange={this.handleChangeIme} value={this.state.doctor.name}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <label>Last name:</label>
                </div>
                <div col="col-sm-4">
                    <input type="text" onChange={this.handleChangePrezime} value={this.state.doctor.lastName}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <label>Working time:</label>
                </div>
                <div col="col-sm-4">
                    <input type="text" onChange={this.handleChangeRadnoVreme} value={this.state.doctor.workingTime}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <button onClick={this.handleSubmit}>Change</button>
                </div>
            </div>
        </form>);
    }
}
export default ShowDoctor;