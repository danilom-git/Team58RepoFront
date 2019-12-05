import React, { Component } from "react";
import Axios from "axios";

class HallAddForm extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        name: ""
    };

    handleChangeName = event => {
        this.setState({ name: event.target.value });
    };

    handleSubmit = (e) => {
        //name,lastName moraju da odgovaraju dto
        e.preventDefault();
        if(this.state.name) {
            const postHall = {
                name: this.state.name,

            };
            console.log("pre posta", postHall);
            Axios.post("http://localhost:8080/api/halls", postHall).then(function (
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
                        <input type="text" onChange={this.handleChangeName} />
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