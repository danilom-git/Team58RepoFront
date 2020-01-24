import React, { Component } from "react";
import Axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class ShowHall extends Component{

    constructor(props) {
        super(props);
        this.state.hall = this.props.hall;
    }
    state = {
        hall :{},
        modal: false,
        responseText:"Changes saved"
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/halls/" + this.state.hall.id).then(res => {
            this.setState({hall:res.data});
        });
    }

    handleChangeName = event => {
        this.setState({ hall: {...this.state.hall,name:event.target.value} });
    };

    handleChangeNumber = event => {
        this.setState({ hall: {...this.state.hall,number:event.target.value} });
    };

    handleSubmit = (e) => {
        //name,lastName moraju da odgovaraju dto
        e.preventDefault();
        if(this.state.hall) {
            const postHall = this.state.hall;
            console.log("pre posta", postHall);
            Axios.put("http://localhost:8080/api/halls", postHall,{
                headers: {
                    Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6ImRvY3RvcjAxQHNvbWVtYWlsLmNvbSIsImF1ZCI6IndlYiIsImlhdCI6MTU3NjQyNDI2OSwiZXhwIjoxNTc5MDE2MjY5fQ.alvmCZRVm_FctN7kVoknRETlJAmKWCmqoU3jbUmr8MRi0DkbWjX6z-rKfxV7NnkPzPiyhHn4_NWqxVoMW3euXQ"
                }
            }).then((res) => {
                this.showModal();
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
                        <input type="text" value={this.state.hall.name} onChange={this.handleChangeName} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Number:</label>
                    </div>
                    <div col="col-sm-4">
                        <input type="text" value={this.state.hall.number} onChange={this.handleChangeNumber} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <button onClick={(e) => this.handleSubmit(e)}>Change</button>
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
export default ShowHall;