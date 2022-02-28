const notes = (state = [], action) => {
    // Sets the notes for the chosen vehicle
    switch (action.type) {
        case 'SET_NOTES':
            return action.payload;
        default:
            return state;
    }
}

export default notes;