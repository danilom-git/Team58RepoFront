import React, { Component } from "react";
import Axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class HallAddForm extends Component{

    state = {
        name: "",
        number: "",
        modal: false,
        responseText:"Fill the form correctly",
        clinicId:""
    };

    componentDidMount() {
        Axios({
            method:'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
        }).then((result) => {
            this.setState({clinicId:result.data.id});
        });
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    handleChangeName = event => {
        this.setState({ name: event.target.value });
        if(this.state.number !== "" && this.state.name !== "")
            this.setState({responseText:"Hall added"});
    };

    handleChangeNumber = event => {
        this.setState({ number: event.target.value });
        if(this.state.number !== "" && this.state.name !== "")
            this.setState({responseText:"Hall added"});
    };

    handleSubmit = (e) => {
        //name,lastName moraju da odgovaraju dto
        e.preventDefault();
        if(this.state.name && this.state.number) {
            const postHall = {
                name: this.state.name,
                number: this.state.number,
                clinicId:this.state.clinicId
            };
            //console.log("pre posta", postHall);
            Axios.post("http://localhost:8080/api/halls", postHall,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res)=>{
                this.setState((prev) => ({responseText:"Hall added"}));
                this.showModal();
            });
        }else {
            this.setState((prev) => ({responseText:"Fill the form correctly"}));
            this.showModal();
        }
    };


    render() {
        return (
            <form>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Name:</label>
                    </div>
                    <div className="col-sm-4">
                        <input className="form-control" type="text" onChange={this.handleChangeName} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Number:</label>
                    </div>
                    <div className="col-sm-4">
                        <input className="form-control" type="text" onChange={this.handleChangeNumber} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <button className="btn btn btn-primary"  onClick={(e) => this.handleSubmit(e)}>Add</button>
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
            </form>
        );
    }
}
export default HallAddForm;