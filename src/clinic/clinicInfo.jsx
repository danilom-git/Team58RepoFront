import React, {Component} from "react";
import Axios from "axios";
import {YMaps, Map, GeoObject} from 'react-yandex-maps';

class ClinicInfo extends Component {

    state = {
        clinicId: "",
        clinicInfo: {}
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
                url: 'http://localhost:8080/api/clinics/getOne/clinic:' + this.state.clinicId,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
            }).then((res) => {
                console.log(res.data);
                res.data.averageRating  = res.data.averageRating.toFixed(2);
                this.setState(() => ({clinicInfo: res.data}));
            });
        });
    }

    render() {
        return (<>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div className="col">Name: </div>
                        <div className="col">{this.state.clinicInfo.name}</div>
                    </div>
                    <div className="row">
                        <div className="col">Contry: </div>
                        <div className="col">{this.state.clinicInfo.country}</div>
                    </div>
                    <div className="row">
                        <div className="col">City: </div>
                        <div className="col">{this.state.clinicInfo.city}</div>
                    </div>
                    <div className="row">
                        <div className="col">Adress: </div>
                        <div className="col">{this.state.clinicInfo.address} </div>
                    </div>
                    <div className="row">
                        <div className="col">Average rating:</div>
                        <div className="col">{this.state.clinicInfo.averageRating}</div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button onClick={(e)=> this.props.changeClinicInfo(e,this.state.clinicId)} className="btn btn-primary mt-2">Change</button>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <YMaps>
                        <div>
                            Clinic location:
                            <Map state={{
                                center: [this.state.clinicInfo.xCoord, this.state.clinicInfo.yCoord],
                                zoom: 12
                            }}>
                                <GeoObject
                                    geometry={{
                                        type: 'Point',
                                        coordinates: [this.state.clinicInfo.xCoord, this.state.clinicInfo.yCoord],
                                    }}
                                    properties={{
                                        iconContent: '',
                                        hintContent: 'Clinic location',
                                    }}
                                />
                            </Map>
                        </div>
                    </YMaps>
                </div>
            </div>
        </>);
    }

}

export default ClinicInfo;