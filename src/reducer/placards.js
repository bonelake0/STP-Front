import * as ActionTypes from '../acitons/ActionTypes';

export const Placards = (state ={
    isLoading: true,
    errmess: null,
    placards:[]
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_PLACARDS:
            return {...state, isLoading: false, errmess: null, placards: action.payload};
        
        case ActionTypes.PLACARDS_LOADING:
            return {...state, isLoading: true, errmess: null, placards: []};

        case ActionTypes.PLACARDS_FAILED:
            return {...state, isLoading: false, errmess: action.payload, placards: null};
        
    default: 
        return state;
    }
};