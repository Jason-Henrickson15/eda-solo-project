import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchYears() {
    try {
        const years = yield axios.get('/api/car/year');
        yield put({ type: 'SET_YEARS', payload: years.data });
    } catch (error) {
        console.log('there was an error in the fetchYears saga', error);
    }
}

function* fetchMakes(action) {
    try {
        const makes = yield axios.get(`/api/car/make/${action.payload}`);
        yield put({ type: 'SET_MAKES', payload: makes.data });
    } catch (error) {
        console.log('there was an error in the fetchMakes saga', error);
    }
}

function* fetchModels(action) {
    console.log('this is the payload', action.payload);
    try {
        const models = yield axios.get(`/api/car/model/${action.payload.year}/${action.payload.make}`);
        yield put({ type: 'SET_MODELS', payload: models.data });
    } catch (error) {
        console.log('there was an error in the fetchModels saga', error);
    }
}

function* carSaga() {
    yield takeEvery('FETCH_YEARS', fetchYears);
    yield takeEvery('FETCH_MAKES', fetchMakes);
    yield takeEvery('FETCH_MODELS', fetchModels);
}

export default carSaga;