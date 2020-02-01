import React, { Component } from "react";
import Axios from "axios";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  overlay: {zIndex: 10000}
};

class DoctorAddForm extends Component {
  state = {
    ime: "",
    prezime: "",
    email: "",
    modal: false,
    responseText: "Fill the form correctly",
    workingTime: 0,
    clinicId: ""
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
  }

  showModal = () => {
    this.setState({modal: true});
  };

  handleModalCloseRequest = () => {
    this.setState({modal: false});
  };

  handleChangeIme = event => {
    this.setState({ime: event.target.value});

  };

  handleChangePrezime = event => {
    this.setState({prezime: event.target.value});

  };

  handleWorkingTime = event => {
    this.setState({workingTime: event.target.value});

  };

  handleEmail = event => {
    this.setState({ email: event.target.value });

  };

  handleSubmit = (e) => {
    e.preventDefault();
    //name,lastName moraju da odgovaraju dto
    if(this.state.ime && this.state.prezime) {
      const postDoctor = {
        name: this.state.ime,
        lastName: this.state.prezime,
        workingTime: this.state.workingTime,
        email:this.state.email,
        clinicId:this.state.clinicId
      };
      console.log("pre posta", postDoctor);
      Axios.post("http://localhost:8080/api/doctors", postDoctor,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((res)=>{
        this.setState((prev) => ({responseText:"Doctor added"}));
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
              <input className="form-control" type="text" onChange={this.handleChangeIme} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <label>Last name:</label>
            </div>
            <div className="col-sm-4">
              <input className="form-control" type="text" onChange={this.handleChangePrezime} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <label>Working time:</label>
            </div>
            <div className="col-sm-4">
              <input className="form-control" type="text" onChange={this.handleWorkingTime} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <label>Email:</label>
            </div>
            <div className="col-sm-4">
              <input className="form-control" type="email" onChange={this.handleEmail} />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-2">
              <button className="btn btn btn-primary" onClick={this.handleSubmit}>Add</button>
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

export default DoctorAddForm;
