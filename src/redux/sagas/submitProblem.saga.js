import axios from 'axios';
import { takeEvery, put } from 'redux-saga/effects';


function* submitProblem(action) {
    try {
        console.log('this is the payload', action.payload);
        const id = yield axios.post('/api/notes/problem', action.payload);
        console.log('this is the noteID in submitProblemSaga', id.data.id);
        yield put({ type: 'SET_NOTEID', payload: id.data.id });
    }
    catch (error) {
        console.log('ERROR in submitProblemSaga', error);
    }

}

function* submitSaga() {
    yield takeEvery('SUBMIT_PROBLEM', submitProblem);
}

export default submitSaga;