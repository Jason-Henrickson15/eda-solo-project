import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';


function* submitThumbail(action) {
    console.log('in thumbnail saga');
    try {
        console.log('payload', action.payload);
        yield axios.put(`/api/notes/thumbnail/${action.payload.noteID}`, action.payload);
    }
    catch (error) {
        console.log('ERROR in submitThumbail', error);
    }
}

function* thumbnailSaga() {
    yield takeEvery('SUBMIT_THUMBNAIL', submitThumbail);
}

export default thumbnailSaga;