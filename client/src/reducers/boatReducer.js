const boatReducer = (state = {}, action) => {
  Object.freeze(state);
  let nextState = { ...state };
  switch (action.type) {
    default:
      return state;
  }
};

export default boatReducer;
