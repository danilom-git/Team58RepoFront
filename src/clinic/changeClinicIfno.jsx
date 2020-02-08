import React, {Component} from "react";
import Axios from "axios";

class ChangeClinicInfo extends Component{

    state = {
        clinicInfo: {}
    };

    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/clinics/getOne/clinic:' + this.props.clinicId,
            headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
        }).then((res) => {
            console.log(res.data);
            this.setState(() => ({clinicInfo: res.data}));
        });
    }

    onChangeName = (e) => {
        this.setState({clinicInfo:{...this.state.clinicInfo,name:e.target.value}});
    };

    onChangeAddress = (e) => {
        this.setState({clinicInfo:{...this.state.clinicInfo,address:e.target.value}});
    };

    onChangeCity = (e) => {
        this.setState({clinicInfo:{...this.state.clinicInfo,city:e.target.value}});
    };

    onChangeCountry = (e) => {
        this.setState({clinicInfo:{...this.state.clinicInfo,country:e.target.value}});
    };

    onChangeXcoord = (e) => {
        this.setState({clinicInfo:{...this.state.clinicInfo,xCoord:parseFloat(e.target.value)}});
    };

    onChangeYcoord = (e) => {
        this.setState({clinicInfo:{...this.state.clinicInfo,yCoord:parseFloat(e.target.value)}});
    };

    handleSubmit = () =>{
      console.log(this.state.clinicInfo);
    };

    render() {
        return (<>
                <div className="row">
                    <div className="col-sm-4">Name:</div>
                    <div className="col-sm-4">
                        <input onChange={this.onChangeName} className="form-control" type="text" value={this.state.clinicInfo.name}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Address:</div>
                    <div className="col-sm-4">
                        <input onChange={this.onChangeAddress} className="form-control" type="text" value={this.state.clinicInfo.address}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">City:</div>
                    <div className="col-sm-4">
                        <input onChange={this.onChangeCity} className="form-control" type="text" value={this.state.clinicInfo.city}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Country:</div>
                    <div className="col-sm-4">
                        <input onChange={this.onChangeCountry} className="form-control" type="text" value={this.state.clinicInfo.country}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">X-coord:</div>
                    <div className="col-sm-4">
                        <input onChange={this.onChangeXcoord} className="form-control" type="text" value={this.state.clinicInfo.xCoord}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">Y-coord:</div>
                    <div className="col-sm-4">
                        <input onChange={this.onChangeYcoord} className="form-control" type="text" value={this.state.clinicInfo.yCoord}/>
                    </div>
                </div>
                <div className="row">
                    <div onClick={this.handleSubmit} className="col-sm-4"><button className="btn btn-primary">Change</button></div>
                </div>
            </>

        );
    }
}export default ChangeClinicInfo;