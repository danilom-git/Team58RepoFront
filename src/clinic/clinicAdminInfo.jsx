import React, {Component} from "react";
import Axios from "axios";

class ClinicAdminInfo extends Component {

    state = {
        admin: {}
    };

    componentDidMount() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'), expiresIn: 0, userType: ""}
        }).then((res) => {
            this.setState({admin: res.data});
            console.log(res.data);
        });
    }

    onChangeName = (e) => {
        this.setState({admin: {...this.state.admin, name: e.target.value}});
    };

    onChangeLastName = (e) => {
        this.setState({admin: {...this.state.admin, lastName: e.target.value}});
    };

    handleSubmit = () => {
        Axios({
            method: 'put',
            url:'http://localhost:8080/api/clinicAdmins',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data:  this.state.admin
        }).then(res => {
            console.log(res.data);
        });
    };

    render() {
        return (<>
            <div className="col">
                <div className="row">
                    <div className="col">Name</div>
                    <div className="col">
                        <input className="form-control" onChange={this.onChangeName} type="text" value={this.state.admin.name}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">Last name</div>
                    <div className="col">
                        <input className="form-control" onChange={this.onChangeLastName} type="text" value={this.state.admin.lastName}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">Email</div>
                    <div className="col">
                        <input className="form-control" disabled={true} type="text" value={this.state.admin.email}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={this.handleSubmit}>Change</button>
                    </div>
                </div>
            </div>
        </>);
    }

}

export default ClinicAdminInfo;