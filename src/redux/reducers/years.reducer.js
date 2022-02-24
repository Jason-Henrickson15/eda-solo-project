const years = (state = [], action) => {
    // Sets the years to all years available in database
    switch (action.type) {
        case 'SET_YEARS':
            return action.payload;
        default:
            return state;
    }
}

export default years;