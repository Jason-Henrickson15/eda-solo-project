import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchYear() {
    try {
        const response = yield axios.get('/api/car/year');
        console.log('this should be all the years', response);
    } catch (error) {
        console.log('there was an error in the fetchYears saga', error);
    }
}

function* fetchMake(action) {
    try {
        const response = yield axios.get(`/api/car/make/${action.payload}`);
        console.log('this should be all the makes', response);
    } catch (error) {
        console.log('there was an error in the fetchMakes saga', error);
    }
}

function* fetchModel(action) {
    console.log('this is the payload', action.payload);
    try {
        const response = yield axios.get(`/api/car/model/${action.payload[0]}/${action.payload[1]}`);
        console.log('this should be all the models', response);
    } catch (error) {
        console.log('there was an error in the fetchModels saga', error);
    }
}

function* carSaga() {
    yield takeEvery('GET_YEAR', fetchYear);
    yield takeEvery('GET_MAKE', fetchMake);
    yield takeEvery('GET_MODEL', fetchModel);
}

export default carSaga;