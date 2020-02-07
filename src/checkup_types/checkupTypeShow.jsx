import React, {Component} from 'react';
import Axios from "axios";

class CheckupTypeShow extends Component{

    state = {
        price: this.props.price,
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
        });
    }

    priceChange = (e) => {
        this.setState({price:e.target.value});
    };

    handleSubmit = () => {
        if(Number(this.state.price) > 0 && this.state.price !== "")
        {
            Axios({
                method: 'put',
                url: 'http://localhost:8080/api/clinicCheckupTypes/clinic:'+this.state.clinicId + "/type:"+this.props.typeId +"/price:"+ this.state.price,
                headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
                data: {token: localStorage.getItem('token'), expiresIn: 0, userType: ""}
            }).then((res) => {
                console.log(res.data);
            });
        }
    };

    render() {
        return (<>
        <div className="row">
            <div className="col">
                <label>Name:</label>
            </div>
        </div>
            <div className="row">
                <div className="col">
                <input value={this.props.name} disabled={true} />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Price:
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input onChange={this.priceChange} value={this.state.price}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button onClick={this.handleSubmit}>Change</button>
                </div>
            </div>
        </>);
    }

}export default CheckupTypeShow;