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
      Axios.get("http://localhost:8080/api/doctors/all/clinic:" + this.props.admin.clinicId).then(res => {
            this.setState({doctors:res.data});
            console.log(res.data);
      });
  };

  handleDelete = (e,id) => {
    Axios.delete("http://localhost:8080/api/doctors/" + id.toString())
        .then(() => this.loadDoctors());
    e.stopPropagation();
  };

  componentDidMount() {
    this.loadDoctors();
  };

  render() {
    const doctors = this.state.doctors.map(doctor => (
      <tr data-naziv="trDoctor" onClick={(e) => this.props.showDoctor(e,doctor)} key={doctor.id}>
          <td>{doctor.id}</td>
          <td>{doctor.name}</td>
          <td>{doctor.lastName}</td>
          <td>{doctor.workingTime}</td>
          <td><button data-naziv="" onClick={(e) => this.handleDelete(e,doctor.id)} type="button" className="btn btn-light">Delete</button></td>
      </tr>
    ));
    return (

         <table className="table">
             <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Price</th>
                </tr>
             </thead>
             <tbody>
                {doctors}
             </tbody>
            </table>

    );
  }
}

export default Doctors;
