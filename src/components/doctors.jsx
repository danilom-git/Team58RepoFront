import React, { Component } from "react";
import Axios from "axios";

class Doctors extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    doctors: []
  };

  loadDoctors = () => {
      fetch("http://localhost:8080/api/doctors/all")
          .then(res => res.json())
          .then(doctors => this.setState({ doctors: doctors }));
  };

  handleDelete = (id) => {
    console.log(id);
    Axios.delete("http://localhost:8080/api/doctors/" + id.toString())
        .then(() => this.loadDoctors());
  };

  componentDidMount() {
    this.loadDoctors();
  };

  render() {
    const doctors = this.state.doctors.map(doctor => (
      <tr onClick={(e) => this.props.showDoctor(e,doctor)} key={doctor.id}>
          <td>{doctor.id}</td>
          <td>{doctor.name}</td>
          <td>{doctor.lastName}</td>
          <td>{doctor.workingTime}</td>
          <td><button onClick={this.handleDelete.bind(this,doctor.id)} type="button" className="btn btn-light">Delete</button></td>
      </tr>
    ));
    return (

         <table className="table">
            <tr>
              <th scope="col">id</th>
              <th scope="col">Name</th>
              <th scope="col">LastName</th>
                <th scope="col">WorkingTime</th>
            </tr>

            {doctors}
            </table>

    );
  }
}

export default Doctors;
