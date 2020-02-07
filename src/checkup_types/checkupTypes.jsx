import React, {Component} from 'react';
import Axios from "axios";

class CheckupTypes extends Component{

    state = {
        types: []
    };

    componentDidMount() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
        }).then((res) => {
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/checkupTypes/all/clinic:'+res.data.clinicId,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res) => {
                //console.log(res.data);
                this.setState({types: res.data});
            });
        });


    }

    render() {
        const types = this.state.types.map(type => (
            <tr key={type.id}>
                <td>{type.name}</td>
                <td>{type.price}</td>
            </tr>
        ));

        return (<>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                </tr>
                </thead>
                <tbody>
                    {types}
                </tbody>
            </table>
        </>);
    }
}export default CheckupTypes;