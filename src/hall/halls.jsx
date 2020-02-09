import React, { Component } from "react";
import Axios from "axios";

class Halls extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        halls: [],
        clinicId:""
    };

    handleDelete (e,id){
        console.log(id);
        Axios.delete("http://localhost:8080/api/halls/" + id.toString() ,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(() => this.loadHalls());
        e.stopPropagation();
    }


    loadHalls = () => {
        Axios.get("http://localhost:8080/api/halls/all/clinic:"+this.state.clinicId,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then(res => {
            this.setState({halls:res.data});
        });
    }

    componentDidMount() {
        Axios({
            method:'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
        }).then((result) => {
            this.setState({clinicId:result.data.id});
        }).then(()=>{
            this.loadHalls();
        });
    }

    render() {
        const halls = this.state.halls.map(hall => (
            <tr onClick={(e) => this.props.showHall(e,hall)} key={hall.id}>
                <td>{hall.name}</td>
                <td>{hall.number}</td>
                <td><button onClick={(e) => this.handleDelete(e,hall.id)} type="button" className="btn btn-primary">Delete</button></td>
            </tr>
        ));
        return (

            <table className="table">
                <thead>
                <tr>
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