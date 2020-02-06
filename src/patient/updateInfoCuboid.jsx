import React, {Component} from 'react';
import Axios from "axios";

class UpdateInfoCuboid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            lastName: '',
            country: '',
            city: '',
            address: '',
            phoneNumber: ''
        };
    }

    componentDidMount() {
        if (this.props.user)
            this.setState({ name: this.props.user.name, lastName: this.props.user.lastName, country: this.props.user.country,
                city: this.props.user.city, address: this.props.user.address, phoneNumber: this.props.user.phoneNumber });
    };

    updateInfo = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.lastName === '' || this.state.country === '' ||
            this.state.city === '' || this.state.address === '' || this.state.phoneNumber === '')
            return;
        Axios({
            method: 'put',
            url: 'http://localhost:8080/api/patients/user/info',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: this.state
        })
            .then(result => this.props.onInfoUpdate && this.props.onInfoUpdate(result.data));
    };

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row'>
                    <div className='col'>
                        <div className='row'>
                            <div className='col'>
                                <h5 className='text-primary'>Update Information</h5>
                            </div>
                            <div className='col'>
                                <button className='btn btn-primary float-right' onClick={this.props.onCancel}>Cancel</button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col'>
                                <form>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='txtName'>Name:</label>
                                                <input type='text' className='form-control' id='txtName'
                                                    onChange={(e) => this.setState( { name : e.target.value })}
                                                    defaultValue={this.props.user && this.props.user.name}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='txtLastName'>Last Name:</label>
                                                <input type='text' className='form-control' id='txtLastName'
                                                    onChange={(e) => this.setState( { lastName: e.target.value })}
                                                       defaultValue={this.props.user && this.props.user.lastName}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='txtCountry'>Country:</label>
                                                <input type='text' className='form-control' id='txtCountry'
                                                    onChange={(e) => this.setState( { country: e.target.value })}
                                                       defaultValue={this.props.user && this.props.user.country}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='txtCity'>City:</label>
                                                <input type='text' className='form-control' id='txtCity'
                                                    onChange={(e) => this.setState( { city: e.target.value })}
                                                       defaultValue={this.props.user && this.props.user.city}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='txtAddress'>Address:</label>
                                                <input type='text' className='form-control' id='txtAddress'
                                                    onChange={(e) => this.setState( { address: e.target.value })}
                                                       defaultValue={this.props.user && this.props.user.address}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <div className='form-group'>
                                                <label htmlFor='txtPhoneNumber'>Phone Number:</label>
                                                <input type='text' className='form-control' id='txtPhoneNumber'
                                                    onChange={(e) => this.setState( { phoneNumber: e.target.value })}
                                                       defaultValue={this.props.user && this.props.user.phoneNumber}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col'>
                                            <button className='btn btn-primary' onClick={this.updateInfo}>
                                                Update Information
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateInfoCuboid;
