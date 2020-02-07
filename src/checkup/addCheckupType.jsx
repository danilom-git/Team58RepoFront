import React, {Component} from 'react';
import Axios from "axios";

class AddCheckupType extends Component{

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
                url: 'http://localhost:8080/api/checkupTypes/allFalse/clinic:'+res.data.clinicId,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res) => {
                console.log(res.data);
                this.setState({types: res.data});
            });
        });
    }

    render() {
        return (<>
        </>);
    }

}export default AddCheckupType;
