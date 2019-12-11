import React, { Component } from "react";
import Axios from "axios";
import Table from "../generic_components/table";

class Patients extends Component{
    constructor(props) {
        super(props);
    }

    state = {
        patients: []
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
                <Table
                    headers={headers}
                    rows={formatted}
                    emptyListMsg={"Cannot render patients"}
                    onRowClick={this.props.changeToPatient}
                />
            </div>
        );
    }

}
export default Patients;