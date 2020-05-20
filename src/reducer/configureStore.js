import { createStore, applyMiddleware, combineReducers} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import { User } from './user';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
        }),
        applyMiddleware(
            thunk,
            logger),
    );

    return store;
};