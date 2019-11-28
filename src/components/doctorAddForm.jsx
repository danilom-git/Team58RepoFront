import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addDoctor } from "../actions/clinicActions";

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
    const postDoctor = {
      ime: this.state.ime,
      prezime: this.state.prezime
    };
    console.log(postDoctor);
    this.props.addDoctor(postDoctor);
  };

  render() {
    return (
      <React.Fragment>
        {this.props.renderAddDoctorForm && (
          <form>
            <label>
              Name:
              <input type="text" onChange={this.handleChangeIme} />
            </label>
            <br/>
            <label>
              Last name:
              <input type="text" onChange={this.handleChangePrezime} />
            </label>
            <br/>
            <label>
              <button onClick={this.handleSubmit}>Add</button>
            </label>
          </form>
        )}
      </React.Fragment>
    );
  }
}

DoctorAddForm.propTypes = {
  renderAddDoctorForm: PropTypes.bool,
  addDoctor: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  renderAddDoctorForm: state.clinicInfo.renderAddDoctorForm
});

export default connect(mapStateToProps, { addDoctor })(DoctorAddForm);
