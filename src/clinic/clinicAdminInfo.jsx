import React, {Component} from "react";
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};


class ClinicAdminInfo extends Component {

    state = {
        admin: {},
        modal: false,
        newPassword: "",
        oldPassword: ""
    };

    componentDidMount() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'), expiresIn: 0, userType: ""}
        }).then((res) => {
            this.setState({admin: res.data});
            console.log(res.data);
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
        this.setState({admin: {...this.state.admin, name: e.target.value}});
    };

    onChangeLastName = (e) => {
        this.setState({admin: {...this.state.admin, lastName: e.target.value}});
    };

    handleSubmit = () => {
        Axios({
            method: 'put',
            url: 'http://localhost:8080/api/clinicAdmins',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: this.state.admin
        }).then(res => {
            console.log(res.data);
        });
    };

    render() {
        return (
            <>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col">Name</div>
                            <div className="col">
                                <input className="form-control" onChange={this.onChangeName} type="text"
                                       value={this.state.admin.name}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">Last name</div>
                            <div className="col">
                                <input className="form-control" onChange={this.onChangeLastName} type="text"
                                       value={this.state.admin.lastName}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">Email</div>
                            <div className="col">
                                <input className="form-control" disabled={true} type="text"
                                       value={this.state.admin.email}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className="btn btn-primary" onClick={this.handleSubmit}>Change</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <button onClick={this.showModal} className="btn btn-primary">Change password</button>
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

export default ClinicAdminInfo;