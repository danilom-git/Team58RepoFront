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
        let clicks = this.state.oneClicks.map(click => (
            <tr   key={click.id}>
                <td>{click.id}</td>
                <td>{click.price}</td>
                <td>{click.doctorId}</td>
                <td>{click.hallId}</td>
                <td>{click.checkupTypeId}</td>
                <td>{click.startTime}</td>

            </tr>
        ));

        return (

            <table className="table">
                <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Price</th>
                    <th scope="col">Doctor id</th>
                    <th scope="col">Hall id</th>
                    <th scope="col">Checkup type id</th>
                    <th scope="col">Date</th>

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