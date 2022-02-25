import axios from 'axios';
import { takeEvery } from 'redux-saga/effects';


function* submitProblem(action) {
    try {
        console.log('this is the payload', action.payload);
        yield axios.post('/api/notes/problem', action.payload);
    }
    catch (error) {
        console.log('ERROR in submitProblemSaga', error);
    }

}

function* submitSaga() {
    yield takeEvery('SUBMIT_PROBLEM', submitProblem);
}

export default submitSaga;