import React, {Component} from 'react';
import Sidebar from "../generic_components/sidebar";
import EmptyCuboid from "./emptyCuboid";
import ClinicsCuboid from "./clinicsCuboid";

class PatientPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cuboid: <EmptyCuboid />
        }
    }


    cuboidClinics = () => {
        this.setState({cuboid: <ClinicsCuboid />})
    };

    render() {
        return (
            <div className='container-fluid pt-2'>
                <div className='row h-100'>
                    <Sidebar
                        links={[
                            {id: 1, text: 'Browse Clinics', onClick: this.cuboidClinics},
                            {id: 2, text: 'Link Two'},
                            {id: 3, text: 'Link Three'}
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