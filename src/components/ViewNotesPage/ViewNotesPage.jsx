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
        else if (year === 'Select Year') {
            dispatch({ type: 'SET_MAKES', payload: [] });
            dispatch({ type: 'SET_MODELS', payload: [] })
        }
    }

    function getModels(make) {
        if (make !== 'Select Make') {
            setSelectedMake(make);
            dispatch({ type: 'FETCH_MODELS', payload: { year: selectedYear, make } });
        }
        else if (make === 'Select Make') {
            dispatch({ type: 'SET_MODELS', payload: [] });
        }
    }

    function setModel(model) {
        if (model !== 'Select Model') {
            setSelectedModel(model)
            dispatch({ type: 'FETCH_ID', payload: { year: selectedYear, make: selectedMake, model } });
            setRenderNotes(false);
        }
        else if (model === 'Select Model') {
            dispatch({ type: 'SET_NOTES', payload: [] })
        }
    }

    const [noteToDelete, setNoteToDelete] = useState();
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    function checkDeleteNote(noteID) {
        console.log('this is the selected id', noteID);
        setDeleteConfirm(true);
        setNoteToDelete(noteID);
    }

    function deleteNote(noteID) {
        setDeleteConfirm(false);
        console.log('this would be the deleted note', noteID);
        dispatch({ type: 'DELETE_NOTE', payload: { noteID, car_id } })
    }

    function deleteNoteCancel() {
        setDeleteConfirm(false);
    }

    const deleteConfirmBox =
        <div className='dimmer'>
            <div className='confirmationBox'>
                <h5>Are you sure you want to delete this note?</h5>
                <p>This cannot be undone.</p>
                <div className='deleteBtnContainer'>
                    <Button onClick={() => deleteNote(noteToDelete)} className='confirmBtn confirmDelete'>Delete</Button>
                    <Button onClick={() => deleteNoteCancel()} className='confirmBtn confirmCancel'>Cancel</Button>
                </div>
            </div>
        </div>

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
            {deleteConfirm ? deleteConfirmBox : <></>}
            <div>
                <BuildNotesList notes={notes} checkDeleteNote={checkDeleteNote}/>
            </div>
        </div>
    )
}

export default ViewNotes;