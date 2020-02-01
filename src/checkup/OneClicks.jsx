import React, { Component } from "react";
import Axios from "axios";

class OneClicks extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        oneClicks:[]
    };

    componentDidMount() {
        this.loadOneClicks();
    }

    loadOneClicks = () => {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/one',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'),expiresIn:0,userType:""}
        }).then((result) => {
            Axios.get('http://localhost:8080/api/oneClickCheckup/all/clinic:' + result.data.id,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }).then((res) => {
                let clicks = res.data;
                console.log(clicks);
                for(let c of clicks)
                {
                    c.startTime = new Date(c.startTime);
                    c.endTime = new Date(c.endTime);
                    let spl  = c.startTime.toISOString().split('T');
                    console.log(spl);
                    c.startTime = spl[0] + " " + spl[1].slice(0,5);
                }
                this.setState({oneClicks:clicks});
                //  console.log(this.state.doctors);
            });
        });


    };

    render() {
        let clicks = this.state.oneClicks.map(click => (
            <tr key={click.id}>
                <td>{click.doctorName + " " + click.doctorLastName}</td>
                <td>{click.hallNumber}</td>
                <td>{click.checkupType}</td>
                <td>{click.startTime}</td>
                <td>{click.duration}</td>
                <td>{click.price}</td>
                <td><button className="btn btn-light">Schedule</button></td>
            </tr>
        ));



        return (

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Doctor</th>
                    <th scope="col">Hall</th>
                    <th scope="col">Checkup type</th>
                    <th scope="col">Start time</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Price</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                    {clicks}
                </tbody>
            </table>

        );
    }
}
export default OneClicks;