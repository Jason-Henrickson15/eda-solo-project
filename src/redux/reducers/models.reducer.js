const models = (state = [], action) => {
    // Sets the models to all models that came out in the selected year under the chosen manufacturer
    switch (action.type) {
        case 'SET_MODELS':
            return action.payload;
        default:
            return state;
    }
}

export default models;