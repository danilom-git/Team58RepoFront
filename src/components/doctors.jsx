import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getDoctors} from "../actions/clinicActions";


class Doctors extends React.Component{
    componentWillMount() {
        console.log("Mount Doctors");
        this.props.getDoctors();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost) {
            this.props.clinicInfo.unshift(nextProps.newPost);
        }
    }


    render() {
        const doctors = this.props.doctors.map(doctor => (
            <div key={doctor.id}>
                <p>Ime: {doctor.name}</p>
                <p>Prezime: {doctor.lastName}</p>
            </div>
        ));
        return (

        <React.Fragment>
            <div>
            {doctors}
            </div>
        </React.Fragment>
        );
    }
}

Doctors.propTypes = {
    getDoctors: PropTypes.func.isRequired,
    doctors: PropTypes.array.isRequired,
    renderDoctor: PropTypes.object
};


const mapStateToProps = state => ({
    doctors: state.clinicInfo.doctors,
    renderDoctor: state.clinicInfo.renderDoctor
});

export default connect(mapStateToProps,{getDoctors})(Doctors);