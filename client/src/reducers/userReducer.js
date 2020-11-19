import {
    SET_USER,
} from '../actions';

const initState = {
    profile: {
        id: "",
        username: "initUser",
        email: "initUser@init.com",
        firstname: "Inny",
        lastname: "User",
        zipcode: "00000",
        about: "",
        skill: 1,
        profile_pic: "init",
        banner_pic: "init",
        sprite: "init",
    }
}
// initial state set to empty object.
// default values may need to be handled by proper init state
const userReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_USER:
            return action.user;
        default:
            return state;
    }
};

export default userReducer;
