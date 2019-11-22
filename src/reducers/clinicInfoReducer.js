import { GET_DOCTORS , GET_HALLS } from "../actions/types";

const initialState = {
    doctors: [],
    halls: []
};

export default function(state = initialState, action) {//dodati caseove
    switch (action.type) {
        case GET_DOCTORS:
            return {
                ...state,
                doctors: action.payload
            };
        default:
            //mora default da ima
            return state;
    }
}