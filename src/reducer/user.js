import * as ActionType from '../acitons/ActionTypes';

export const User = (state = { 
    id: '',
    username: '',
    name: '',
    createdDate: '',
    profilePic: '',
    role: '',
    isLoggedIn: false,
    isLoading: false,
    likedPlacards: [],
}, action) => {
    switch (action.type) {
        case ActionType.LOGIN_USER:
            return {
                ...state,
                id: action.payload.userId,
                username: action.payload.username,
                isLoggedIn: true,
            };

        case ActionType.SET_USER:
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                name: action.payload.name,
                role: action.payload.role,
                isLoggedIn: true,
            };

        case ActionType.USER_FAILED:
            return {
                ...state,
                isLoggedIn: false
            };
        
        case ActionType.PROFILE_FAILED:
            return {
                ...state,
                isLoading: false,
            };

        case ActionType.POFILE_LOADING:
            return {
                ...state,
                isLoading: true,
            };


        case ActionType.UPDATE_PROFILE:{
            return{
                ...state,
                username: action.payload.login,
                name: action.payload.name,
                createdDate: action.payload.createdDate,
                profilePic: action.payload.profilePicture,
                isLoading: false,
            };
        }
        
        default:
            return state;
    }
};