import React, {Component} from 'react';
import Axios from "axios";

class RegistrationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            name: '',
            lastName: '',
            healthInsuranceId: '',
            country: '',
            city: '',
            address: '',
            phoneNumber: ''
        };
    }

    sendRegistrationRequest = (e) => {
        e.preventDefault();
        if (this.state.email === '' || this.state.password === '' || this.state.name === '' ||
            this.state.lastName === '' || this.state.healthInsuranceId === '' || this.state.country === '' ||
            this.state.city === '' || this.state.address === '' || this.state.phoneNumber === '')
            return;
        Axios.post('http://localhost:8080/api/registration/new', this.state)
            .then(result => this.props.onRegistration && this.props.onRegistration(result.data));
    };

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row h-100 justify-content-center'>
                    <div className='col-xl-3 col-lg-4 col-md-5 col-sm-6 m-5'>
                        <h3>Register</h3>
                        <form>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtEmail'>Email:</label>
                                        <input type='email' className='form-control' id='txtEmail'
                                               onChange={(e) => this.setState( { email: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtPassword'>Password:</label>
                                        <input type='txtPassword' className='form-control' id='txtEmail'
                                               onChange={(e) => this.setState( { password: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtName'>Name:</label>
                                        <input type='text' className='form-control' id='txtName'
                                               onChange={(e) => this.setState( { name : e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtLastName'>Last Name:</label>
                                        <input type='text' className='form-control' id='txtLastName'
                                               onChange={(e) => this.setState( { lastName: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtHealthInsuranceId'>Health Insurance ID:</label>
                                        <input type='text' className='form-control' id='txtHealthInsuranceId'
                                               onChange={(e) => this.setState( { healthInsuranceId: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtCountry'>Country:</label>
                                        <input type='text' className='form-control' id='txtCountry'
                                               onChange={(e) => this.setState( { country: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtCity'>City:</label>
                                        <input type='text' className='form-control' id='txtCity'
                                               onChange={(e) => this.setState( { city: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtAddress'>Address:</label>
                                        <input type='text' className='form-control' id='txtAddress'
                                               onChange={(e) => this.setState( { address: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <div className='form-group'>
                                        <label htmlFor='txtPhoneNumber'>Phone Number:</label>
                                        <input type='text' className='form-control' id='txtPhoneNumber'
                                               onChange={(e) => this.setState( { phoneNumber: e.target.value })}/>
                                    </div>
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col'>
                                    <button className='btn btn-primary' onClick={this.sendRegistrationRequest}>
                                        Send Request
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegistrationPage;
