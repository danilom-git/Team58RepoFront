import React, {Component} from 'react';

class ProfileCuboid extends Component {
    render() {
        return (
            <div className='row border border-primary rounded m-2 p-0'> <div className='col'>
                <div className='row my-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>Name:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.name}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>Last Name:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.lastName}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>Health Insurance ID:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.healthInsuranceId}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>E-Mail:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.email}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>Country:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.country}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>City:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.city}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2 mx-2 border-bottom border-primary'>
                    <div className='col-4'>
                        <label className='float-right'>Address:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.address}</label>
                    </div>
                </div>
                <div className='row mt-0 mb-2'>
                    <div className='col-4'>
                        <label className='float-right'>Phone Number:</label>
                    </div>
                    <div className='col'>
                        <label className='text-primary font-weight-bold'>{this.props.user && this.props.user.phoneNumber}</label>
                    </div>
                </div>
            </div></div>
        );
    }
}

export default ProfileCuboid;
