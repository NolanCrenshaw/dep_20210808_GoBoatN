import {
    SET_USER,
} from '../actions';


// initial state set to empty object.
// default values may need to be handled by proper init state
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;
