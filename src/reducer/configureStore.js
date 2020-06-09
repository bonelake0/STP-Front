import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { User } from './user';
import { Placards } from './placards';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            placards: Placards,
        }),
        applyMiddleware(
            thunk,
            logger
        ),
    );

    return store;
};