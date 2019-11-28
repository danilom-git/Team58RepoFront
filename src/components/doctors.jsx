import React, { Component } from "react";

class Doctors extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    doctors: []
  };

  componentDidMount() {
    fetch("http://localhost:8080/api/doctors/all")
      .then(res => res.json())
      .then(doctors => this.setState({ doctors: doctors }));
  }

  render() {
    const doctors = this.state.doctors.map(doctor => (
      <div key={doctor.id}>
        <p>Ime: {doctor.name}</p>
        <p>Prezime: {doctor.lastName}</p>
      </div>
    ));
    return (
      <div>
        <button onClick={this.props.changeToForm} className="btn btn-dark m-2">
          Add doctor
        </button>
        <div className="m-2">{doctors}</div>
      </div>
    );
  }
}

export default Doctors;
