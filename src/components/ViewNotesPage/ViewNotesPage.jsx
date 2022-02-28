import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


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
        }
    }

    function goToDetails(noteID) {
        console.log('this is the noteID', noteID);
        dispatch({ type: 'FETCH_DETAILS', payload: noteID });
        history.push('/viewDetails');
    }

    function deleteNote(noteID) {
        console.log('this is the note to be deleted', noteID);
    }


    // Conditionally rendering notes to display
    const [noteDisplay, setNoteDisplay] = useState(<>nothing yet...</>);

    function viewNotes() {
        console.log('this is the notes', notes);
        setNoteDisplay(
            <table>
                <thead>
                    <tr>
                        <th>Note ID:</th>
                        <th>Car ID:</th>
                        <th>Note Title:</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map(note => {
                        return (
                            <tr key={note.id}>
                                <td>{note.id}</td>
                                <td>{note.car_id}</td>
                                <td>{note.title}</td>
                                <td><button onClick={() => goToDetails(note.id)}>Details</button></td>
                                <td><button onClick={() => deleteNote(note.id)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }


    return (
        <>
            <h1>Select vehicle to view notes</h1>
            <select onChange={(event) => getMakes(event.target.value)}>
                {/*Displays all years as options*/}
                <option>Select Year</option>
                {years.map(year => {
                    return (
                        <option key={year.year}>{year.year}</option>
                    )
                })}
            </select>

            <select onChange={(event) => getModels(event.target.value)}>
                {/*Displays all Makes depending on selected year*/}
                <option>Select Make</option>
                {makes.map(make => {
                    return (
                        <option key={make.make}>{make.make}</option>
                    )
                })}
            </select>

            <select onChange={(event) => setModel(event.target.value)}>
                {/*Displays all Models depending on selected year and make*/}
                <option>Select Model</option>
                {models.map(model => {
                    return (
                        <option key={model.model}>{model.model}</option>
                    )
                })}
            </select>
            <button onClick={viewNotes}>View Notes</button>

            <br />

            <div>
                {noteDisplay}
            </div>
        </>
    )
}

export default ViewNotes;