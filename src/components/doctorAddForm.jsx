import React, { Component } from "react";
import Axios from "axios";

class DoctorAddForm extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    ime: "",
    prezime: ""
  };

  handleChangeIme = event => {
    this.setState({ ime: event.target.value });
  };

  handleChangePrezime = event => {
    this.setState({ prezime: event.target.value });
  };

  handleSubmit = () => {
    //name,lastName moraju da odgovaraju dto
    const postDoctor = {
      name: this.state.ime,
      lastName: this.state.prezime
    };
    console.log("pre posta", postDoctor);
    Axios.post("http://localhost:8080/api/doctors", postDoctor).then(function(
      res
    ) {
      console.log("posle posta", res);
    });
  };

  render() {
    return (
      <form>
        <div className="row">
          <div className="col-sm-2">
            <label>Name:</label>
          </div>
          <div col="col-sm-4">
            <input type="text" onChange={this.handleChangeIme} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <label>Last name:</label>
          </div>
          <div col="col-sm-4">
            <input type="text" onChange={this.handleChangePrezime} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2">
            <button onClick={this.handleSubmit}>Add</button>
          </div>
        </div>
      </form>
    );
  }
}

export default DoctorAddForm;
