import React, { Component } from "react";
import Axios from "axios";

class Halls extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        halls: []
    };

    handleDelete (id){
        console.log(id);
        Axios.delete("http://localhost:8080/api/halls/" + id.toString() );
    }


    componentDidMount() {
        fetch("http://localhost:8080/api/halls/all")
            .then(res => res.json())
            .then(halls => this.setState({ halls: halls }));
    }

    render() {
        const halls = this.state.halls.map(hall => (
            <tr key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>

                <td><button onClick={this.handleDelete.bind(this,hall.id)} type="button" className="btn btn-light">Delete</button></td>
            </tr>
        ));
        return (

            <table className="table">
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>

                </tr>

                {halls}
            </table>

        );
    }
}