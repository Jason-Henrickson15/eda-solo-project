import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* deleteNote(action) {
    try {
        yield axios.delete(`/api/images/delete/${action.payload.noteID}`);
        yield axios.delete(`/api/notes/delete/${action.payload.noteID}`);
        yield put({ type: 'FETCH_NOTES', payload: action.payload.car_id })
    } catch (error) {
        console.log('there was an error deleting note in saga', error);
    }
}

function* deleteSaga() {
    yield takeEvery('DELETE_NOTE', deleteNote);
}

export default deleteSaga;