import React, { Component } from "react";
import Axios from "axios";
import Modal from "bootstrap/js/src/modal";
import Button from "bootstrap/js/src/button";

class ShowDoctor extends Component{
    constructor(props) {
        super(props);
        this.state.id = this.props.doctor.id;
        this.state.doctor = this.props.doctor;
    }

    state = {
        id : "",
        doctor: {},
        modal: false
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

    handleChangeEmail = event => {
        this.setState({ doctor : {...this.state.doctor,email : event.target.value} });
    };

    showModal = () => {
        this.setState({modal:true});
    };

    exitModal = () => {
        this.setState({modal:true});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //name,lastName moraju da odgovaraju dto
        console.log( this.state.doctor);
        if(this.state.doctor.name && this.state.doctor.lastName && this.state.doctor.workingTime != 0) {
            this.setState((prev) => ({modal:true}));
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
        return (

                <form>
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
                    <label>Email:</label>
                </div>
                <div col="col-sm-4">
                    <input className="form-control" type="email" value={this.state.doctor.email} onChange={this.handleChangeEmail} />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-2">
                    <button  className="btn btn btn-primary" type="button" onClick={this.handleSubmit} >Change</button>
                </div>
            </div>
                    {this.state.modal && <div id="myModal" className="modal fade" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Info</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div className="modal-body">
                                    <p>Changes sent</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>}
        </form>
        );


    }
}
export default ShowDoctor;