import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchNotes(action) {
    try {
        const notes = yield axios.get(`/api/notes/${action.payload}`);
        console.log('this is the new notes', notes.data);
        yield put({ type: 'SET_NOTES', payload: notes.data });
    } catch (error) {
        console.log('there was an error in the fetchNotes saga', error);
    }
}

function* notesSaga() {
    yield takeEvery('FETCH_NOTES', fetchNotes);
}

export default notesSaga;