import React, {Component} from "react";
import Axios from "axios";
import Modal from 'react-modal';

class AbsenceRequests extends Component{

    state = {
        requests: [],
        clinicId:""
    };

    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/clinicAdmins/user',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
        }).then((res) => {
            this.setState({clinicId: res.data.clinicId});
            console.log(res.data);
            Axios({
                method: 'get',
                url: 'http://localhost:8080/api/absenceRequests/all/clinic:' + this.state.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')}
            }).then((res) => {
                let requests = res.data;
                for(let c of requests)
                {
                    c.startDate = new Date(c.startDate);
                    c.endDate = new Date(c.endDate);
                    let spl  = c.startDate.toISOString().split('T');
                    //console.log(spl);
                    c.startDate = spl[0];
                    spl  = c.endDate.toISOString().split('T');
                    c.endDate = spl[0];

                }
                this.setState({requests: requests});
                console.log(res.data);
            });
        });
    }

    render() {
        const requests = this.state.requests.map(request => (
            <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.doctorName+ " "+ request.doctorLastName }</td>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.type}</td>
                <td><button className="btn btn-success">Allow</button></td>
                <td><button className="btn btn-danger">Decline</button></td>
            </tr>
        ));

        return (<>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Medical worker</th>
                    <th scope="col">Start date</th>
                    <th scope="col">End date</th>
                    <th scope="col">Reason</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {requests}
                </tbody>

            </table>
        </>);
    }

}export default AbsenceRequests;