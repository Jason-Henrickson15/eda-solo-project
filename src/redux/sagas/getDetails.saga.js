import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchDetails(action) {
    try {
        const notes = yield axios.get(`/api/notes/details/${action.payload}`);
        console.log(notes.data);
        yield put({ type: 'SET_DETAILS', payload: notes.data });
    } catch (error) {
        console.log('there was an error in the fetchDetails saga', error);
    }
}

function* detailsSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails);
}

export default detailsSaga;