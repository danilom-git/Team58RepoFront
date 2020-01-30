import React, { Component } from "react";
import Axios from "axios";

class OneClicks extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        oneClicks:[]
    }

    componentDidMount() {
        this.loadOneClicks();
    }

    loadOneClicks = () => {
        Axios.get('http://localhost:8080/api/oneClickCheckup/all').then((res) => {
            this.setState({oneClicks:res.data});
            //  console.log(this.state.doctors);
        })
    };

    render() {
        let clicks = this.state.oneClicks;
        for(let c of clicks)
        {
            let spl  = c.startTime.toString().split('T');
            c.startTime = spl[0] + " " + spl[1].slice(0,5);
        }

        clicks = clicks.map(click => (
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