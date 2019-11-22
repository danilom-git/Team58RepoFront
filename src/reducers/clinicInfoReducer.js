import {GET_DOCTORS, GET_HALLS, SET_CLADMINNAV_RENDER, SET_CLINIC_RENDER, SET_DOCTOR_RENDER} from "../actions/types";

const initialState = {
    doctors: [],
    halls: [],
    renderDoctors:true,
    renderClinicAdminNav:true,
    renderClinicProfileNav:false
};

export default function(state = initialState, action) {//dodati caseove
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
        default:
            //mora default da ima
            return state;
    }
}