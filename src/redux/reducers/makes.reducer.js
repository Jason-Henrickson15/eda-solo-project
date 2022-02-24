const makes = (state = [], action) => {
    // Sets the makes to all makes that made cars during the user selected year
    switch (action.type) {
        case 'SET_MAKES':
            return action.payload;
        default:
            return state;
    }
}

export default makes;