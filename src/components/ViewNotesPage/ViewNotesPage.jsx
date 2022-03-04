import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import BuildNotesList from './sub-components/BuildNotesList/BuildNotesList';

import './ViewNotesPage.css';


function ViewNotes() {
    // Allows the user to view all notes sorted by the specific vehicle
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const years = useSelector(store => store.years);
    const makes = useSelector(store => store.makes);
    const models = useSelector(store => store.models);
    const car_id = useSelector(store => store.carID);
    const notes = useSelector(store => store.notes);

    const [renderNotes, setRenderNotes] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch({ type: 'FETCH_YEARS' });
    }, []);

    function getMakes(year) {
        if (year !== 'Select Year') {
            setSelectedYear(year);
            setSelectedMake('Select Year');
            setSelectedModel('Select Year');
            dispatch({ type: 'FETCH_MAKES', payload: year });
        }
    }

    function getModels(make) {
        if (make !== 'Select Model') {
            setSelectedMake(make);
            dispatch({ type: 'FETCH_MODELS', payload: { year: selectedYear, make } });
        }
    }

    function setModel(model) {
        if (model !== 'Select Model') {
            setSelectedModel(model)
            dispatch({ type: 'FETCH_ID', payload: { year: selectedYear, make: selectedMake, model } });
            setRenderNotes(false);
        }
    }

    function getThumbnail() {
        console.log('getting thumbnail');
    }

    function goToDetails(noteID) {
        console.log('this is the noteID', noteID);
        dispatch({ type: 'FETCH_DETAILS', payload: noteID });
        dispatch({ type: 'FETCH_IMAGES', payload: noteID });
        history.push('/viewDetails');
    }

    function deleteNote(noteID) {
        dispatch({ type: 'DELETE_NOTE', payload: { noteID, car_id } })
    }

    return (
        <div className='viewDocContainer'>
            <h1>Select vehicle to view notes</h1>
            <div className='selectorContainer'>
                <select className='ymmDropDown year' onChange={(event) => getMakes(event.target.value)}>
                    {/*Displays all years as options*/}
                    <option>Select Year</option>
                    {years.map(year => {
                        return (
                            <option key={year.year}>{year.year}</option>
                        )
                    })}
                </select>

                <select className='ymmDropDown' onChange={(event) => getModels(event.target.value)}>
                    {/*Displays all Makes depending on selected year*/}
                    <option>Select Make</option>
                    {makes.map(make => {
                        return (
                            <option key={make.make}>{make.make}</option>
                        )
                    })}
                </select>

                <select className='ymmDropDown model' onChange={(event) => setModel(event.target.value)}>
                    {/*Displays all Models depending on selected year and make*/}
                    <option>Select Model</option>
                    {models.map(model => {
                        return (
                            <option key={model.model}>{model.model}</option>
                        )
                    })}
                </select>
                <br />
            </div>

            <div>
                <BuildNotesList notes={notes} goToDetails={goToDetails}/>
            </div>
        </div>
    )
}

export default ViewNotes;