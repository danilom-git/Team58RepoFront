import {
  GET_DOCTORS,
  GET_HALLS,
  SET_CLADMINNAV_RENDER,
  SET_CLINIC_RENDER,
  SET_DOCTOR_RENDER,
  SET_DOCTORFORM_RENDER,
  ADD_DOCTOR
} from "../actions/types";

const initialState = {
  doctors: [],
  newDoctor: {},
  halls: [],
  renderDoctors: false,
  renderClinicAdminNav: true,
  renderClinicProfileNav: false,
  renderAddDoctorForm: false
};

export default function(state = initialState, action) {
  //dodati caseove
  switch (action.type) {
    case GET_DOCTORS:
      return {
        ...state,
        doctors: action.payload
      };
    case SET_DOCTOR_RENDER:
      return {
        ...state,
        renderDoctors: action.payload
      };
    case SET_CLADMINNAV_RENDER:
      return {
        ...state,
        renderClinicAdminNav: action.payload
      };
    case SET_CLINIC_RENDER:
      return {
        ...state,
        renderClinicProfileNav: action.payload
      };
    case SET_DOCTORFORM_RENDER:
      return {
        ...state,
        renderAddDoctorForm: action.payload
      };
    case ADD_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, action.payload.data]
      };
    default:
      //mora default da ima
      return state;
  }
}
