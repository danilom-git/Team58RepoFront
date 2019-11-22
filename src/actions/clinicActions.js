import { GET_DOCTORS , GET_HALLS } from "../actions/types";

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