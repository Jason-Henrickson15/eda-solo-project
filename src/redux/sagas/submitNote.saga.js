import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';


function* submitNote(action) {
    try {
        console.log('this is the payload', action.payload);
        const id = yield axios.post('/api/notes/note', action.payload);
        console.log('this is the id in the submitNote saga', id.data.id);
        yield put({ type: 'SET_NOTEID', payload: id.data.id });
    }
    catch (error) {
        console.log('ERROR in submitNoteSaga', error);
    }
}

function* submitSaga() {
    yield takeEvery('SUBMIT_NOTE', submitNote);
}

export default submitSaga;