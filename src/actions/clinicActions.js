import { GET_DOCTORS , GET_HALLS ,SET_DOCTOR_RENDER,SET_CLADMINNAV_RENDER,SET_CLINIC_RENDER} from "../actions/types";

export const getDoctors = () => dispatch => {
    console.log("get zahtev");

    fetch('http://localhost:8080/api/doctors/all')
        .then(res => res.json())
        .then(doctors =>
            dispatch({
                type: GET_DOCTORS,
                payload: doctors
            })
        );
};

export const setDoctorsRender = () => dispatch => {
    console.log("uslov render");

            dispatch({
                type: SET_DOCTOR_RENDER,
                payload: true
            })

};

export const setClinicRender = (uslov) => dispatch => {
    console.log("uslov render");

    dispatch({
        type: SET_CLINIC_RENDER,
        payload: uslov
    })

};

export const setClinicAdminRender= (uslov) => dispatch => {
    console.log("uslov render");

    dispatch({
        type: SET_CLADMINNAV_RENDER,
        payload: uslov
    })

};