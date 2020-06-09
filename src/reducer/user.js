import * as ActionType from '../acitons/ActionTypes';

export const User = (state = { 
    id: '',
    username: '',
    name: '',
    role: '',
    isLoggedIn: false,
}, action) => {
    switch (action.type) {
        case ActionType.LOGIN_USER:
            return {
                ...state, 
                username: action.payload.username
            }; // remove?

        case ActionType.SET_USER:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                name: action.payload.name,
                role: action.payload.role,
                isLoggedIn: true,
            };

        case ActionType.USER_FAILED:{
            console.log(action.payload);
            return {
                ...state,
                isLoggedIn: false
            }
        }

        default:
            return state;
    }
};