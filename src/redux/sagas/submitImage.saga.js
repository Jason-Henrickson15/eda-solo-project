import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';


function* submitImage(action) {
    try {
        console.log('this is the payload', action.payload);
        yield axios.post('/api/images', action.payload);
    }
    catch (error) {
        console.log('ERROR in submitImageSaga', error);
    }
}

function* submitSaga() {
    yield takeEvery('SUBMIT_IMAGE', submitImage);
}

export default submitSaga;