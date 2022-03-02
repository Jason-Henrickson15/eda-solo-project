const images = (state = [], action) => {
    // Sets the images for the selected note
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

export default images;