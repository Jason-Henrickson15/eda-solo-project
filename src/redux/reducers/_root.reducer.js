import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import years from './years.reducer';
import makes from './makes.reducer';
import models from './models.reducer';
import carID from './carID.reducer';
import notes from './notes.reducer';
import details from './details.reducer';
import noteID from './noteID.reducer';
import images from './images.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  years,
  makes,
  models,
  carID,
  notes,
  details,
  noteID,
  images
});

export default rootReducer;
