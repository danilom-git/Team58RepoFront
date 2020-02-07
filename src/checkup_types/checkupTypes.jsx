import React, {Component} from 'react';
import Axios from "axios";

class CheckupTypes extends Component{

    state = {
        types: [],
        clinicId: ""
    };

    loadTypes = () => {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
        }).then((res) => {
            this.setState({clinicId:res.data.clinicId});
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/checkupTypes/all/clinic:'+res.data.clinicId,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res) => {
                //console.log(res.data);
                this.setState({types: res.data});
            });
        });
    };

    componentDidMount() {
        this.loadTypes();
    }

    deleteHandle = (e,typeId) =>{
        Axios({
            method: 'delete',
            url: 'http://localhost:8080/api/clinicCheckupTypes/clinic:'+this.state.clinicId + "/type:"+typeId,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then((res)=>{
            if(res.data)
                this.loadTypes();
        });
    };

    render() {
        const types = this.state.types.map(type => (
            <tr key={type.id}>
                <td>{type.name}</td>
                <td>{type.price}</td>
                <td><button onClick={(e) => this.deleteHandle(e,type.id)} className="btn btn-primary">Delete</button></td>
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