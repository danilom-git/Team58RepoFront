import React, {Component} from 'react';
import Sidebar from "../generic_components/sidebar";
import EmptyCuboid from "./emptyCuboid";
import ClinicsCuboid from "./clinicsCuboid";
import Axios from "axios";
import ProfileCuboid from "./profileCuboid";

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

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row h-100'>
                    <Sidebar
                        links={[
                            {id: 1, text: 'Home Page', onClick: this.openEmptyCuboid},
                            {id: 2, text: 'Browse Clinics', onClick: this.openClinicsCuboid},
                            {id: 3, text: 'View Medical Record'},
                            {id: 4, text: 'View Profile', onClick: this.openProfileCuboid}
                            ]}/>
                    <div className='col'>
                        {
                            this.state.cuboid === this.clinicsCuboid ?
                                <ClinicsCuboid openEmptyCuboid={this.openEmptyCuboid} />
                            : this.state.cuboid === this.profileCuboid ?
                                <ProfileCuboid user={this.state.user}/>
                            :
                                <EmptyCuboid user={this.state.user} />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientPage;
