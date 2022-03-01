import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';

import carSaga from './car.saga';
import submitNoteSaga from './submitNote.saga';
import submitProblemSaga from './submitProblem.saga';
import getNotesSaga from './getNotes.saga';
import getDetailsSaga from './getDetails.saga';
import deleteSaga from './deleteNote.saga';
import submitImageSaga from './submitImage.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    carSaga(),
    submitNoteSaga(),
    submitProblemSaga(),
    getNotesSaga(),
    getDetailsSaga(),
    deleteSaga(),
    submitImageSaga()
  ]);
}
