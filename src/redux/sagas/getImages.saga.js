import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchImages(action) {
    try {
        if (action.payload!==undefined) {
            const images = yield axios.get(`/api/images/${action.payload}`);
            yield put({ type: 'SET_IMAGES', payload: images.data })
        }
    } catch (error) {
        console.log('there was an error in the fetchImages saga', error);
    }
}

function* getImagesSaga() {
    yield takeEvery('FETCH_IMAGES', fetchImages);
}

export default getImagesSaga;