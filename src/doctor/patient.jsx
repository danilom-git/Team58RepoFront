import React, { Component } from "react";
import Axios from "axios";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class Patient extends Component{
    state = {
        modal: false,
        responseText: "You don't have access to medical record.",
        patient : {},
        doctor: {}
    };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

    checkMedcalRecord = () => {
        Axios({ //medical record check
            method: 'get',
            url: 'http://localhost:8080/api/checkups/checkMedicalRecord/patient:'+this.props.patient+'/doctor:'+this.state.doctor.id,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then((res) => {
            console.log(res.data);
            this.showModal();
        });
    };

    componentDidMount() {
        Axios.get("http://localhost:8080/api/patients/id:" + this.props.patient,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState((prevState) => ({patient: res.data}));
            console.log(this.state.patient);
            Axios({         //get doctor
                method: 'get',
                url: 'http://localhost:8080/api/doctors/user',
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res) => {
                this.setState({doctor:res.data});
            });
        });
    }

    render() {
        return (<><div className="col">
            <div className="row">
                <div className="col">
                    <div className="text-center">
                        <button onClick={this.checkMedcalRecord} className='btn btn-primary'>
                            Medical record
                        </button>
                    </div>
            </div>
                <div className="col">
                    <div className="text-center">
                        <button onClick={(e)=> this.props.changeToDoctorRequest(e,this.state.patient)} className='btn btn-primary'>
                            Checkup start
                        </button>
                        </div>
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
        </>);
    }
}
export default Patient;
