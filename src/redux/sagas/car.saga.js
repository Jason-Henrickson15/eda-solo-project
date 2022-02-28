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
    try {
        const models = yield axios.get(`/api/car/model/${action.payload.year}/${action.payload.make}`);
        yield put({ type: 'SET_MODELS', payload: models.data });
    } catch (error) {
        console.log('there was an error in the fetchModels saga', error);
    }
}

function* fetchID(action) {
    try {
        const id = yield axios.get(`/api/car/id/${action.payload.year}/${action.payload.make}/${action.payload.model}`);
        yield put({ type: 'SET_ID', payload: id.data[0].id});
        yield put({ type: 'FETCH_NOTES', payload: id.data[0].id});
    } catch (error) {
        console.log('there was an error in fetchID saga', error);
    }
}

function* carSaga() {
    yield takeEvery('FETCH_YEARS', fetchYears);
    yield takeEvery('FETCH_MAKES', fetchMakes);
    yield takeEvery('FETCH_MODELS', fetchModels);
    yield takeEvery('FETCH_ID', fetchID);
}

export default carSaga;