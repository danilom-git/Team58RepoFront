import {
  GET_DOCTORS,
  GET_HALLS,
  SET_DOCTOR_RENDER,
  SET_CLADMINNAV_RENDER,
  SET_CLINIC_RENDER,
  SET_DOCTORFORM_RENDER,
  ADD_DOCTOR
} from "../actions/types";
import Axios from "axios";

export const addDoctor = doctor => dispatch => {
  console.log(doctor);
  Axios.post("http://localhost:8080/api/doctors", {
    name: doctor.ime,
    lastName: doctor.prezime
  }).then(function(res) {
    console.log("posle posta", res);
    dispatch({ type: ADD_DOCTOR, payload: res });
  });
};

export const getDoctors = () => dispatch => {
  console.log("get doctors");

  fetch("http://localhost:8080/api/doctors/all")
    .then(res => res.json())
    .then(doctors =>
      dispatch({
        type: GET_DOCTORS,
        payload: doctors
      })
    );
};

export const setDoctorsRender = uslov => dispatch => {
  dispatch({
    type: SET_DOCTOR_RENDER,
    payload: uslov
  });
};

export const setClinicRender = uslov => dispatch => {
  dispatch({
    type: SET_CLINIC_RENDER,
    payload: uslov
  });
};

export const setClinicAdminRender = uslov => dispatch => {
  dispatch({
    type: SET_CLADMINNAV_RENDER,
    payload: uslov
  });
};

export const setDoctorFormRender = uslov => dispatch => {
  dispatch({
    type: SET_DOCTORFORM_RENDER,
    payload: uslov
  });
};
