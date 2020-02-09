import React, { Component } from "react";
import Axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
    overlay: {zIndex: 10000}
};

class Doctors extends Component {
  constructor(props) {
    super(props);
  }

  state = {
      doctors: [],
      modal: false,
      responseText:"Doctors with scheduled checkups can't be deleted.",
      clinicId:""
  };

    showModal = () => {
        this.setState({modal: true});
    };

    handleModalCloseRequest = () => {
        this.setState({modal: false});
    };

  loadDoctors = () => {
      Axios.get("http://localhost:8080/api/doctors/all/clinic:" + this.state.clinicId,{
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }).then(res => {
            this.setState({doctors:res.data});
            //console.log(res.data);
      });
  };

  handleDelete = (e,id) => {
    Axios.delete("http://localhost:8080/api/doctors/" + id.toString(),{
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then((res) => {
            this.loadDoctors();
        },(error) => {this.showModal();});
   /* Axios({
        method: 'delete',
        url: "http://localhost:8080/api/doctors/" + id.toString(),
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
    }).then(()=>{
        this.loadDoctors();
    });*/
    e.stopPropagation();
  };

  componentDidMount() {
      Axios({
          method:'post',
          url: 'http://localhost:8080/api/clinicAdmins/self',
          headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
          data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
      }).then((result) => {
          this.setState({clinicId:result.data.id});
      }).then(()=>{
          this.loadDoctors();
      });
  };

  render() {
    const doctors = this.state.doctors.map(doctor => (
      <tr data-naziv="trDoctor" onClick={(e) => this.props.showDoctor(e,doctor)} key={doctor.id}>
          <td>{doctor.name}</td>
          <td>{doctor.lastName}</td>
          <td>{doctor.workingTime}</td>
          <td>{doctor.email}</td>
          <td><button onClick={(e) => this.handleDelete(e,doctor.id)} type="button" className="btn btn-primary">Delete</button></td>
      </tr>
    ));
    return (
        <>
         <table className="table">
             <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Work hours</th>
                    <th scope="col">Email</th>
                </tr>
             </thead>
             <tbody>
                {doctors}
             </tbody>

            </table>
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
            </>
    );
  }
}

export default Doctors;
