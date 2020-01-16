import React, {Component} from 'react';
import Sidebar from "../generic_components/sidebar";
import EmptyCuboid from "./emptyCuboid";
import ClinicsCuboid from "./clinicsCuboid";

class PatientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cuboid: this.emptyCuboid
        }
    }

    emptyCuboid = <EmptyCuboid/>;
    openEmptyCuboid = () => {
        this.setState( {cuboid: <EmptyCuboid />} );
    };

    clinicsCuboid = <ClinicsCuboid openEmptyCuboid={this.openEmptyCuboid}/>;
    openClinicsCuboid = () => {
        this.setState({cuboid: this.clinicsCuboid} );
    };

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row h-100'>
                    <Sidebar
                        links={[
                            {id: 1, text: 'Browse Clinics', onClick: this.openClinicsCuboid},
                            {id: 2, text: 'View Medical Record'},
                            {id: 3, text: 'View Profile'}
                            ]}/>
                    <div className='col'>
                        {this.state.cuboid}
                    </div>
                </div>
            </div>
        );
    }
}

export default PatientPage;