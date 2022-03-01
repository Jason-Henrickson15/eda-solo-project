const noteID = (state = [], action) => {
    // Sets the ID for the last created note
    switch (action.type) {
        case 'SET_NOTEID':
            return action.payload;
        default:
            return state;
    }
}

export default noteID;