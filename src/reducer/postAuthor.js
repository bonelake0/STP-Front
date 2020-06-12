import * as ActionTypes from '../acitons/ActionTypes';

export const PostAuthor = (state ={
    isLoading: true,
    errmess: null,
    author: {
        login: '',
        description: '',
        name: '',
        profilePicture: '',
        createdDate: '',
    }
}, action) => {
    switch (action.type) {
        case ActionTypes.UPDATE_AUTHOR:
            return {...state, isLoading: false, errmess: null, author: action.payload};
        
        case ActionTypes.AUTHOR_LOADING:
            return {...state, isLoading: true, errmess: null, placard: []};

        case ActionTypes.AUTHOR_FAILED:
            return {...state, isLoading: false, errmess: action.payload, placard: null};
        
    default: 
        return state;
    }
};