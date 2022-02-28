const details = (state = [], action) => {
    // Sets the id for the chosen vehicle
    switch (action.type) {
        case 'SET_DETAILS':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

export default details;