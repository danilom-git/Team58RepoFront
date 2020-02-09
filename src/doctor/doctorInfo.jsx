import React, {Component} from 'react';
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};


class DoctorInfo extends Component {

    state = {
        doctor: {},
        name: "",
        lastName: "",
        newPassword: "",
        oldPassword: ""
    };

    componentDidMount() {
        Axios({/// get doctor
            method: 'get',
            url: 'http://localhost:8080/api/doctors/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then((res) => {
            this.setState({doctor: res.data});
        });
    }

    passwordChange = () =>{
        let passDto = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        };

        console.log(passDto);

        Axios({
            method:'put',
            url:'http://localhost:8080/auth/changePassword',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: passDto
        }).then((res)=>{
            console.log(passDto);
            this.handleModalCloseRequest();
        });
    };

    newPasswordOnChange = (e) =>{
        this.setState({newPassword:e.target.value});
    };

    oldPasswordOnChange = (e) =>{
        this.setState({oldPassword:e.target.value});
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    onChangeName = (e) => {
        console.log(this.state);
        this.setState({doctor: {...this.state.doctor, name: e.target.value}});
    };

    onChangeLastName = (e) => {
        this.setState({doctor: {...this.state.doctor, lastName: e.target.value}});
    };

    handleSubmit = () => {
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
        return (
            <>
                <div className="col">
                    <div className="row">
                        <div className="">
                            <div className="row">
                                <div className="col">Name:</div>
                                <div className="col">
                                    <input onChange={this.onChangeName} className="form-control" type="text"
                                           value={this.state.doctor.name}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">Last name:</div>
                                <div className="col">
                                    <input onChange={this.onChangeLastName} className="form-control" type="text"
                                           value={this.state.doctor.lastName}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">Email:</div>
                                <div className="col">
                                    <input disabled={true} className="form-control" type="text"
                                           value={this.state.doctor.email}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">Working hours:</div>
                                <div className="col">
                                    <input disabled={true} className="form-control" type="text"
                                           value={this.state.doctor.workingTime}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">Clinic:</div>
                                <div className="col">
                                    <input disabled={true} className="form-control" type="text"
                                           value={this.state.doctor.clinicName}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <button onClick={this.handleSubmit} className="btn btn-primary">Change</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <button onClick={this.showModal} className="btn btn-primary">Change password</button>
                        </div>
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
                            <h4 className="modal-title">Change your password</h4>
                            <button type="button" className="close" onClick={this.handleModalCloseRequest}>
                                <span aria-hidden="true">&times;</span>
                                <span className="sr-only">Close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Old password:</p>
                            <input onChange={this.oldPasswordOnChange} type="password"/>
                            <p>New password:</p>
                            <input onChange={this.newPasswordOnChange} type="password"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    onClick={this.passwordChange}>Confirm
                            </button>
                            <button type="button" className="btn btn-secondary"
                                    onClick={this.handleModalCloseRequest}>Close
                            </button>
                        </div>
                    </div>
                </Modal>
            </>);
    }

}

export default DoctorInfo;