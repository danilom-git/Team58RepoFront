import React, { Component } from "react";
import Axios from "axios";

class Halls extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        halls: []
    };

    handleDelete (e,id){
        console.log(id);
        Axios.delete("http://localhost:8080/api/halls/" + id.toString() ,{
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6InBhdGllbnQwMUBzb21lbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1NzYyMTkyNjQsImV4cCI6MTU3ODgxMTI2NH0.0eSK1sd_Qoks0_W0zRWnj3yOKXUI3H5TJkIlXZ2nfa_AljSV_B4KSJCAEXyKYYeRgn2tIQxU0HxfOE_LCgoypQ"
            }
        }).then(() => this.loadHalls());
        e.stopPropagation();
    }


    loadHalls = () => {
        Axios.get("http://localhost:8080/api/halls/all/clinic:"+this.props.admin.clinicId,{
            headers: {
                Authorization: 'Bearer ' + "eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJoZWFsdGh5LWFwcCIsInN1YiI6InBhdGllbnQwMUBzb21lbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE1NzYyMTkyNjQsImV4cCI6MTU3ODgxMTI2NH0.0eSK1sd_Qoks0_W0zRWnj3yOKXUI3H5TJkIlXZ2nfa_AljSV_B4KSJCAEXyKYYeRgn2tIQxU0HxfOE_LCgoypQ"
            }
        }).then(res => {
            this.setState({halls:res.data});
        });
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