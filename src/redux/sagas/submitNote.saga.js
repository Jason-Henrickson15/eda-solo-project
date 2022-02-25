import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* submitNote(action) {
    try {
        console.log('this is the payload', action.payload);
        // yield axios.post('/note', action.payload);
    }
    catch (error) {
        console.log('ERROR in submitNoteSaga', error);
    }

}

function* submitSaga() {
    yield takeEvery('SUBMIT_NOTE', submitNote);
}

export default submitSaga;