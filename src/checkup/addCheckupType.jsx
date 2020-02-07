import React, {Component} from 'react';
import Axios from "axios";

class AddCheckupType extends Component {

    state = {
        types: [],
        price: 0,
        typeId: "",
        name: "",
        clinicId: ""
    };

    componentDidMount() {
        Axios({
            method: 'post',
            url: 'http://localhost:8080/api/clinicAdmins/self',
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: {token: localStorage.getItem('token'), expiresIn: 0, userType: ""}
        }).then((res) => {
            this.setState({clinicId: res.data.clinicId});
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

    priceChange = (e) => {
        this.setState({price:Number(e.target.value)});
    };

    typeChange = (e) => {
        this.setState({typeId:e.target.value});
        for(let t of this.state.types)
        {
            if(t.id == e.target.value) {
                //console.log(t);
                this.setState({name: t.name});
                break;
            }
        }
    };

    handleSubmit = (e) =>{
        console.log(this.state);
        if(this.state.typeId !== "" && this.state.price !== 0)
        {
            let data = {
                price: this.state.price,
                name: this.state.name,
                clinicId: this.state.clinicId,
                id: this.state.typeId
            };

            Axios({
                method: 'post',
                url: 'http://localhost:8080/api/clinicCheckupTypes/clinic:' + this.state.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                data: data
            }).then((res)=>{
                console.log(res.data);
            });
        }
    };

    render() {
        let types = this.state.types.map(type => (
            <option value={type.id} key={type.id}>{type.name}</option>
        ));

        return (<>
            <div className="row">
                <div className="col-sm-8">
                    <label>Select checkup type for adding:</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <select onChange={this.typeChange} className="form-control">
                        <option value="" />
                        {types}</select>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4 mt-2">
                    <label>Enter price:</label>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <input onChange={this.priceChange} className="form-control" type="text" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <button onClick={this.handleSubmit} className="btn btn-primary mt-2">Add</button>
                </div>
            </div>
        </>);
    }

}

export default AddCheckupType;
