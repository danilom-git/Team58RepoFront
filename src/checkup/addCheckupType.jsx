import React, {Component} from 'react';
import Axios from "axios";

class AddCheckupType extends Component {

    state = {
        types: [],
        price: 0
    };

    componentDidMount() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'), expiresIn: 0, userType: ""}
        }).then((res) => {
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/checkupTypes/allFalse/clinic:' + res.data.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res) => {
                console.log(res.data);
                this.setState({types: res.data});
            });
        });
    }

    render() {
        let types = this.state.types.map(type => (
            <option value={type.name} key={type.id}>{type.name}</option>
        ));

        return (<>
            <div className="row">
                <div className="col-sm-8">
                    <label>Select checkup type for adding:</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <select className="form-control">
                        <option value=""></option>
                        {types}</select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <label>Enter price:</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <input className="form-control" type="text"></input>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <button className="btn btn-primary mt-2">Add</button>
                </div>
            </div>
        </>);
    }

}

export default AddCheckupType;
