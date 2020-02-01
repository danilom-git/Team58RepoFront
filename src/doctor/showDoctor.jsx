import React, {Component} from "react";
import Axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class ShowDoctor extends Component {
    constructor(props) {
        super(props);
        this.state.id = this.props.doctor.id;
        this.state.doctor = this.props.doctor;
    }

    state = {
        id: "",
        doctor: {},
        modal: false
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/doctors/" + this.state.id,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({doctor: res.data});
        });
    }

    handleChangeIme = event => {
        this.setState({doctor: {...this.state.doctor, name: event.target.value}});
    };

    handleChangePrezime = event => {
        this.setState({doctor: {...this.state.doctor, lastName: event.target.value}});
    };

    handleChangeRadnoVreme = event => {
        this.setState({doctor: {...this.state.doctor, workingTime: event.target.value}});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        //name,lastName moraju da odgovaraju dto
        console.log(this.state.doctor);
        if (this.state.doctor.name && this.state.doctor.lastName && this.state.doctor.workingTime !== 0) {
            this.setState((prev) => ({modal: true}));
            const postDoctor = this.state.doctor;
            console.log("pre posta", postDoctor);
            Axios.put("http://localhost:8080/api/doctors", postDoctor,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then(res => {
                    this.showModal();
                }
            );
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
                        <input type="text" onChange={this.handleChangeIme} value={this.state.doctor.name}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Last name:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" onChange={this.handleChangePrezime} value={this.state.doctor.lastName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Working time:</label>
                    </div>
                    <div className="col-sm-4">
                        <input type="text" onChange={this.handleChangeRadnoVreme}
                               value={this.state.doctor.workingTime}/>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <button className="btn btn btn-primary" type="button" onClick={this.handleSubmit}>Change
                        </button>
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
                            <p>Changes saved</p>
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

export default ShowDoctor;
