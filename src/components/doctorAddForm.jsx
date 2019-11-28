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
        <label>
          Name:
          <input type="text" onChange={this.handleChangeIme} />
        </label>
        <br />
        <label>
          Last name:
          <input type="text" onChange={this.handleChangePrezime} />
        </label>
        <br />
        <label>
          <button onClick={this.handleSubmit}>Add</button>
        </label>
      </form>
    );
  }
}

export default DoctorAddForm;
