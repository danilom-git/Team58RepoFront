import React, {Component} from 'react';
import Axios from "axios";

class MedicalCuboid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            medicalRecord: {}
        }
    }

    componentDidMount() {
        this.loadMedicalRecord();
    }

    loadMedicalRecord = () => {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/patients/user/medical',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => this.setState({ medicalRecord: result.data }));
    };

    render() {
        return (
            <div className='row border border-primary rounded m-2 p-0'>
                <div className='col'>
                    <div className='row my-2 mx-2 border-bottom border-primary'>
                        <div className='col-4'>
                            <label className='float-right'>Age:</label>
                        </div>
                        <div className='col'>
                            <label className='text-primary font-weight-bold'>{this.state.medicalRecord && this.state.medicalRecord.age}</label>
                        </div>
                    </div>
                    <div className='row mb-2 mx-2 border-bottom border-primary'>
                        <div className='col-4'>
                            <label className='float-right'>Blood Type:</label>
                        </div>
                        <div className='col'>
                            <label className='text-primary font-weight-bold'>{this.state.medicalRecord && this.state.medicalRecord.bloodType}</label>
                        </div>
                    </div>
                    <div className='row mb-2 mx-2 border-bottom border-primary'>
                        <div className='col-4'>
                            <label className='float-right'>Height:</label>
                        </div>
                        <div className='col'>
                            <label className='text-primary font-weight-bold'>{this.state.medicalRecord && this.state.medicalRecord.height}</label>
                        </div>
                    </div>
                    <div className='row mb-2 mx-2 border-bottom border-primary'>
                        <div className='col-4'>
                            <label className='float-right'>Weight:</label>
                        </div>
                        <div className='col'>
                            <label className='text-primary font-weight-bold'>{this.state.medicalRecord && this.state.medicalRecord.weight}</label>
                        </div>
                    </div>
                    <div className='row mb-1 mx-2'>
                        <div className='col-4'>
                            <label className='float-right'>Diopter:</label>
                        </div>
                        <div className='col'>
                            <label className='text-primary font-weight-bold'>{this.state.medicalRecord && this.state.medicalRecord.diopter}</label>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MedicalCuboid;
