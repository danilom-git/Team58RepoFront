import React, { Component } from "react";
import Axios from "axios";
import Table from "../generic_components/table";

class Patients extends Component{
    state = {
        patients: [],
        patientsSearch:[],
        patientsShow:[],
        name:"",
        lastName:"",
        healthInsuranceId:"",
        countrys:[],
        citys:[],
        city:"",
        country:"",
        disable:true
    };

    componentDidMount() {
        this.loadPatients();
    }

    loadPatients = () => {
        Axios.get("http://localhost:8080/api/patients/all",{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=>{
            //console.log(res.data);
            this.setState({ patientsShow: res.data });
            this.setState({ patients: res.data });

        });
    };

    changeName = (e) => {
        this.setState({name:e.target.value});
    };

    changeLastName = (e) => {
        this.setState({lastName:e.target.value});
    };

    changeHealthInsuranceId = (e) => {
        this.setState({healthInsuranceId:e.target.value});
    };

    changeCity = (e) => {
        //console.log(e.target.value);
        if(e.target.value !== "") {
            this.setState({city: e.target.value});
            let newPatients = [];
            if(this.state.country !== "") {
                for (let c of this.state.patientsSearch) {
                    if (c.city === e.target.value && c.country === this.state.country)
                        newPatients.push(c);
                }
            }else{
                for (let c of this.state.patientsSearch) {
                    if (c.city === e.target.value)
                        newPatients.push(c);
                }
            }
            this.setState({patientsShow: newPatients});
        }else{
            this.setState({city:""});
            if(this.state.country === "")
                this.setState({patientsShow: []});
        }
    };

    changeCountry = (e) => {
        //console.log(e.target.value);
        if(e.target.value !== "") {
            this.setState({country: e.target.value});
            let newPatients = [];
            if(this.state.city !== "") {
                for (let c of this.state.patientsSearch) {
                    if (c.country === e.target.value && c.city === this.state.city)
                        newPatients.push(c);
                }
            }else {
                for (let c of this.state.patientsSearch) {
                    if (c.country === e.target.value)
                        newPatients.push(c);
                }
            }
            this.setState({patientsShow: newPatients});
        }else
        {
            this.setState({country:""});
            if(this.state.city === "")
                this.setState({patientsShow: []});

        }
    };

    handleSearch = (e) => {
        e.preventDefault();
        Axios.get("http://localhost:8080/api/patients/name:"+this.state.name+",lastName:"+this.state.lastName+",healthInsuranceId:"+this.state.healthInsuranceId,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((res)=> {
                //console.log(res.data);
                this.setState({patientsSearch: res.data});
                this.setState({patientsShow: res.data});
                let citys = [];
                let countrys = [];
                for (let c of res.data)
                {
                    //console.log(c);
                    if(!citys.includes(c.city))
                        citys.push(c.city);

                    if(!countrys.includes(c.country))
                        countrys.push(c.country);
                }
                this.setState({disable:false});
                this.setState({citys:citys});
                this.setState({countrys:countrys});
        }
        );
    };

    render() {
        let headers = [
            {headId: 'name', text: 'Name'},
            {headId: 'lastName', text: 'Last name'},
            {headId: 'healthInsuranceId', text: 'Insurance id'}
        ];

        let formatted = this.state.patientsShow.map(patient => {
            let rl = {};
            for (let header of headers) {
                rl[header.headId] = patient[header.headId]
            }
            rl['rowId'] = patient.id;

            return rl;
        });

        let countrys = this.state.countrys.map(country => (<option key={country} value={country}>{country}</option>));
        let citys = this.state.citys.map(city => (<option key={city} value={city}>{city}</option>));
        return (
            <div className="col">
                <div className="row">
                    <div className="col text-center">
                        <label>Name: </label><br/><input className="form-control" type="text" onChange={this.changeName} />
                    </div>
                    <div className="col text-center">
                        <label>Last name: </label><br/><input className="form-control" type="text" onChange={this.changeLastName}/>
                    </div>
                    <div className="col text-center">
                        <label>Health insurance id: </label><br/><input className="form-control" type="text" onChange={this.changeHealthInsuranceId}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col pt-4">
                        <button onClick={this.handleSearch} className="btn btn-primary form-control">Search</button>
                    </div>
                    <div className="col text-center">
                        <label>Country: </label><br/><select className="form-control" onChange={this.changeCountry} disabled={this.state.disable}><option value=""></option>{countrys}</select>
                    </div>
                    <div className="col text-center">
                        <label>City: </label><br/><select className="form-control" onChange={this.changeCity} disabled={this.state.disable}><option value=""></option>{citys}</select>
                    </div>
                </div>
                <div className="row">
                    <div className="col mt-2">
                        <Table
                            headers={headers}
                            rows={formatted}
                            emptyListMsg={"No results"}
                            onRowClick={this.props.changeToPatient}
                        />
                    </div>
                </div>
            </div>
        );
    }

}
export default Patients;
