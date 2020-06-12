import * as ActionTypes from '../acitons/ActionTypes';

export const Placard = (state ={
    isLoading: true,
    errmess: null,
    placard: {
        id: 0,
        userId: '',
        userLogin: '',
        userPicture: '',
        userName: '',
        name: '',
        shortDescription: '',
        createdDate: '',
        picture: '',
        fullDescription: '',
        tbLink: '',
        fbLink: '',
        discordLink: '',
        likeCount: 0
    }
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_PLACARD:
            return {...state, isLoading: false, errmess: null, placard: action.payload};
        
        case ActionTypes.PLACARD_LOADING:
            return {...state, isLoading: true, errmess: null, placard: []};

        case ActionTypes.PLACARD_FAILED:
            return {...state, isLoading: false, errmess: action.payload, placard: null};

        case ActionTypes.DELETE_PLACARD:
            return {isLoading: false, errmess: null};
        
    default: 
        return state;
    }
};