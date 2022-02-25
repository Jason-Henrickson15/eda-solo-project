const id = (state = [], action) => {
    // Sets the id for the chosen vehicle
    switch (action.type) {
        case 'SET_ID':
            return action.payload;
        default:
            return state;
    }
}

export default id;