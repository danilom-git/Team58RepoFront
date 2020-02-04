import React, {Component} from 'react';
import Sidebar from "../generic_components/sidebar";
import HomeCuboid from "./homeCuboid";
import ClinicsCuboid from "./clinicsCuboid";
import Axios from "axios";
import ProfileCuboid from "./profileCuboid";
import CheckupsCuboid from "./checkupsCuboid";
import MedicalCuboid from "./medicalCuboid";

class PatientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cuboid: this.emptyCuboid,
            user: ''
        }
    }

    componentDidMount() {
        Axios({
            method: 'get',
            url: 'http://localhost:8080/api/patients/user',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token')}
        })
            .then(result => {
                this.setState({ user: result.data });
                console.log(result.data);
            });
    }

    emptyCuboid = 'empty';
    openEmptyCuboid = () => {
        this.setState({ cuboid: this.emptyCuboid });
    };

    clinicsCuboid = 'clinics';
    openClinicsCuboid = () => {
        this.setState({ cuboid: this.clinicsCuboid });
    };

    profileCuboid = 'profile';
    openProfileCuboid = () => {
        this.setState({ cuboid: this.profileCuboid })
    };

    checkupsCuboid = 'checkupHistory';
    openCheckupsCuboid = () => {
        this.setState({ cuboid: this.checkupsCuboid });
    };

    medicalCuboid = 'medical';
    openMedicalCuboid = () => {
        this.setState({ cuboid: this.medicalCuboid });
    };

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row h-100'>
                    <Sidebar
                        links={[
                            {id: 1, text: 'Home Page', onClick: this.openEmptyCuboid},
                            {id: 2, text: 'Browse Clinics', onClick: this.openClinicsCuboid},
                            {id: 3, text: 'Medical Record', onClick: this.openMedicalCuboid},
                            {id: 4, text: 'Checkup History', onClick: this.openCheckupsCuboid},
                            {id: 5, text: 'Profile', onClick: this.openProfileCuboid}
                            ]}/>
                    <div className='col'>
                        {
                            this.state.cuboid === this.clinicsCuboid ?
                                <ClinicsCuboid openEmptyCuboid={this.openEmptyCuboid} />
                            : this.state.cuboid === this.profileCuboid ?
                                <ProfileCuboid user={this.state.user}/>
                            : this.state.cuboid === this.checkupsCuboid ?
                                <CheckupsCuboid />
                            : this.state.cuboid === this.medicalCuboid ?
                                <MedicalCuboid />
                            :
                                <HomeCuboid user={this.state.user} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientPage;
