import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { User } from './user';
import { Placards } from './placards';
import { Placard } from './currentPlacard';
import { PostAuthor } from './postAuthor'
 
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            placards: Placards,
            placard: Placard,
            postAuthor: PostAuthor,
        }),
        applyMiddleware(
            thunk,
            logger
        ),
    );

    return store;
};