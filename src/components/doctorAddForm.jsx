import React, { Component } from "react";

class DoctorAddForm extends Component {
    state = {
        ime :"",
        prezime : ""
    }


    handleChangeIme = (event) => {
        this.setState({value: event.target.value});
    }

    handleChangePrezime = (event) => {
        this.setState({value: event.target.value});
    }

    handleSubmit = () => {

    }


    render() {
        return (<form>
            <label>
                Name:
                <input type="text"  onChange={this.handleChangeIme} />
            </label>
            <label>
                Last name:
                <input type="text" onChange={this.handleChangePrezime} />
            </label>
            <label>
                <button onClick={this.handleSubmit}>Add
                </button>
            </label>
        </form>);
    }
};

export default DoctorAddForm;