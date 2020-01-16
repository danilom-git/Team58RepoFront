import React, { Component } from "react";
import Axios from "axios";

class Halls extends React.Component{
    constructor(props) {
        super(props);
    }

    state = {
        halls: []
    };

    handleDelete (e,id){
        console.log(id);
        Axios.delete("http://localhost:8080/api/halls/" + id.toString() ).then(() => this.loadHalls());
        e.stopPropagation();
    }


    loadHalls = () => {
        fetch("http://localhost:8080/api/halls/all")
            .then(res => res.json())
            .then(halls => this.setState({ halls: halls }));
    }

    componentDidMount() {
      this.loadHalls();
    }

    render() {
        const halls = this.state.halls.map(hall => (
            <tr onClick={(e) => this.props.showHall(e,hall)} key={hall.id}>
                <td>{hall.id}</td>
                <td>{hall.name}</td>
                <td>{hall.number}</td>
                <td><button onClick={(e) => this.handleDelete(e,hall.id)} type="button" className="btn btn-light">Delete</button></td>
            </tr>
        ));
        return (

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Number</th>
                </tr>
                </thead>
                <tbody>
                    {halls}
                </tbody>
            </table>

        );
    }
}
export  default Halls;