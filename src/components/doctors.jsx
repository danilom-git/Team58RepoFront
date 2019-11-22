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
                <h3>{doctor.name}</h3>
                <p>{doctor.lastName}</p>
            </div>
        ));
        return (
            <div>
                <h3>Doctors</h3>
                {doctors}
            </div>
        );
    }
}

Doctors.propTypes = {
    getDoctors: PropTypes.func.isRequired,
    doctors: PropTypes.array.isRequired
};


const mapStateToProps = state => ({
    doctors: state.clinicInfo.doctors
});

export default connect(mapStateToProps,{getDoctors})(Doctors);