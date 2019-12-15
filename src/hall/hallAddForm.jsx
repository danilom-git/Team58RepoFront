import React, { Component } from "react";
import Axios from "axios";

class HallAddForm extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        name: "",
        number: ""
    };

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    };

    handleChangeNumber = event => {
        this.setState({ number: event.target.value });
    };

    handleSubmit = (e) => {
        //name,lastName moraju da odgovaraju dto
        e.preventDefault();
        if(this.state.name) {
            const postHall = {
                name: this.state.name,
                number: this.state.number,
                clinicId:this.props.admin.clinicId
            };
            console.log("pre posta", postHall);
            Axios.post("http://localhost:8080/api/halls", postHall,{
                headers: {
                    Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6InBhdGllbnQwMUBzb21lbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1NzYyMTkyNjQsImV4cCI6MTU3ODgxMTI2NH0.0eSK1sd_Qoks0_W0zRWnj3yOKXUI3H5TJkIlXZ2nfa_AljSV_B4KSJCAEXyKYYeRgn2tIQxU0HxfOE_LCgoypQ"
                }
            }).then(function (
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
                        <input className="form-control" type="text" onChange={this.handleChangeName} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <label>Number:</label>
                    </div>
                    <div col="col-sm-4">
                        <input className="form-control" type="text" onChange={this.handleChangeNumber} />
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-2">
                        <button onClick={(e) => this.handleSubmit(e)}>Add</button>
                    </div>
                </div>
            </form>
        );
    }
}
export default HallAddForm;