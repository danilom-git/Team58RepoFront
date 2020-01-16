import React, { Component } from "react";
import Axios from "axios";

class DoctorAddForm extends Component {
  state = {
    ime: "",
    prezime: "",
    email:"",
    modal:false,
    responseText: "Fill the form correctly",
    workingTime:0
  };

  handleChangeIme = event => {
    this.setState({ ime: event.target.value });
    if(this.state.ime !== "" && this.state.prezime !== "" && this.state.email !== "" && this.state.workingTime !== 0)
      this.setState({responseText:"Doctor added"});
  };

  handleChangePrezime = event => {
    this.setState({ prezime: event.target.value });
    if(this.state.ime !== "" && this.state.prezime !== "" && this.state.email !== "" && this.state.workingTime !== 0)
      this.setState({responseText:"Doctor added"});
  };

  handleWorkingTime = event => {
    this.setState({ workingTime: event.target.value });
    if(this.state.ime !== "" && this.state.prezime !== "" && this.state.email !== "" && this.state.workingTime !== 0)
      this.setState({responseText:"Doctor added"});  };

  handleEmail = event => {
    this.setState({ email: event.target.value });
    if(this.state.ime !== "" && this.state.prezime !== "" && this.state.email !== "" && this.state.workingTime !== 0)
      this.setState({responseText:"Doctor added"});
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
        clinicId:this.props.admin.clinicId
      };
      console.log("pre posta", postDoctor);
      Axios.post("http://localhost:8080/api/doctors", postDoctor).then(function (
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
            <input className="form-control" type="text" onChange={this.handleChangeIme} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <label>Last name:</label>
          </div>
          <div col="col-sm-4">
            <input className="form-control" type="text" onChange={this.handleChangePrezime} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <label>Working time:</label>
          </div>
          <div col="col-sm-4">
            <input className="form-control" type="text" onChange={this.handleWorkingTime} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <label>Email:</label>
          </div>
          <div col="col-sm-4">
            <input className="form-control" type="email" onChange={this.handleEmail} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <button className="btn btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={this.handleSubmit}>Add</button>
          </div>
        </div>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Info</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
                <p>{this.state.responseText}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

      </form>
    );
  }
}

export default DoctorAddForm;
