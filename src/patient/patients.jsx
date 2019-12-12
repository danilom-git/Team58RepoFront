import React, { Component } from "react";
import Axios from "axios";
import Table from "../generic_components/table";

class Patients extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        patients: [],
        name:"",
        lastName:"",
        healthInsuranceId:""
    };

    componentDidMount() {
        this.loadPatients();
    }

    loadPatients = () => {
        Axios.get("http://localhost:8080/api/patients/all").then((res)=>{
            //console.log(res.data);
            this.setState({patients: res.data});
        });
    };

    changeName = (e) => {
        this.setState({name:e.target.value});
    }

    changeLastName = (e) => {
        this.setState({lastName:e.target.value});
    }

    changeHealthInsuranceId = (e) => {
        this.setState({healthInsuranceId:e.target.value});
    }

    handleSearch = (e) => {
        e.preventDefault();
        Axios.get("http://localhost:8080/api/patients/name:"+this.state.name+",lastName:"+this.state.lastName+",healthInsuranceId:"+this.state.healthInsuranceId).then((res)=>{
            //console.log(res.data);
            this.setState({patients: res.data});
        });
    };

    render() {
        let headers = [
            {headId: 'name', text: 'Name'},
            {headId: 'lastName', text: 'Last name'},
            {headId: 'healthInsuranceId', text: 'Insurance id'}
        ];

        let formatted = this.state.patients.map(patient => {
            let rl = {};
            for (let header of headers) {
                rl[header.headId] = patient[header.headId]
            }
            rl['rowId'] = patient.id;

            return rl;
        });

        return (
            <div className="col">
                <div className="row">
                    <div className="col">
                        <label>Name: </label><input type="text" onChange={this.changeName} />
                    </div>
                    <div className="col">
                        <label>Last name: </label><input type="text" onChange={this.changeLastName}/>
                    </div>
                    <div className="col">
                        <label>Health insurance id: </label><input type="text" onChange={this.changeHealthInsuranceId}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-2">
                        <button onClick={this.handleSearch} className="btn btn-primary mt-2 mb-2">Search</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Table
                            headers={headers}
                            rows={formatted}
                            emptyListMsg={"Cannot render patients"}
                            onRowClick={this.props.changeToPatient}
                        />
                    </div>
                </div>
            </div>
        );
    }

}
export default Patients;