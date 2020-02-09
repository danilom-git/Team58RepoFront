import React, {Component} from 'react';
import Axios from "axios";

class ChangePasswordCuboid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }

    changePassword = (e) => {
        e.preventDefault();
        if (this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmPassword === '' ||
            this.state.newPassword !== this.state.confirmPassword)
            return;

        Axios({
            method: 'put',
            url: 'http://localhost:8080/auth/changePassword',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')},
            data: { oldPassword: this.state.oldPassword, newPassword: this.state.newPassword }
        })
            .then(() => this.props.onPasswordChange && this.props.onPasswordChange());
    };

    render() {
        return (
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
                                            <label htmlFor='txtOld'>Old Password:</label>
                                            <input type='password' className='form-control' id='txtOld'
                                                   onChange={(e) => this.setState( { oldPassword : e.target.value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <label htmlFor='txtNew'>New Password:</label>
                                            <input type='password' className='form-control' id='txtNew'
                                                   onChange={(e) => this.setState( { newPassword: e.target.value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className='form-group'>
                                            <label htmlFor='txtConfirm'>Confirm Password:</label>
                                            <input type='password' className='form-control' id='txtConfirm'
                                                   onChange={(e) => this.setState( { confirmPassword: e.target.value })}/>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button className='btn btn-primary' onClick={this.changePassword}>
                                            Change Password
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ChangePasswordCuboid;
