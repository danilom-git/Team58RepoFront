import React, { Component } from "react";
import Axios from "axios";

class CheckupRequests extends Component{

    state = {
        clinicId:"",
        requests: []
    };

    loadCheckus = () =>{
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/clinicAdmins/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({clinicId:res.data.clinicId});
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/checkupRequests/all/clinic:' + res.data.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then((res) => {
                for (let c of res.data)
                {
                    let st = new Date(c.startDate);
                    c.startDate = st.toLocaleDateString()+  " " + st.toLocaleTimeString();
                    st = new Date(c.endDate);
                    c.endDate = st.toLocaleDateString()+  " " + st.toLocaleTimeString();
                }
                console.log(res.data);
                this.setState({requests:res.data});
            });
        });

    };

    componentDidMount() {
        this.loadCheckus();
    }

    render() {
        let reqs = this.state.requests.map(request => (
            <tr key={request.id}>
                <td>{request.doctorName+ " "+ request.doctorLastName }</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.checkupTypeId}</td>
                <td><button onClick={ (e) => this.props.changeToSearchHall(request.id)} className="btn btn-primary">Schedule</button></td>
            </tr>
        ));
        return (
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Doctor</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Checkup type</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {reqs}
                </tbody>

            </table>
        );
    }

}export default CheckupRequests;