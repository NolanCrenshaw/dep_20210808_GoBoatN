import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';


const middleware = applyMiddleware(thunk, logger);

const configureStore = (preloadedState = {}) => {
    return createStore(
        rootReducer,
        preloadedState,
        composeWithDevTools(middleware),
    );
};

export default configureStore;
