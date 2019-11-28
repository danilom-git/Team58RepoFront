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
      <tr key={doctor.id}>
          <td>{doctor.id}</td>
        <td>{doctor.name}</td>
        <td>{doctor.lastName}</td>
          <td><button type="button" className="btn btn-light">Delete</button></td>
      </tr>
    ));
    return (

         <table className="table">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">LastName</th>
            </tr>

            {doctors}
            </table>

    );
  }
}

export default Doctors;
