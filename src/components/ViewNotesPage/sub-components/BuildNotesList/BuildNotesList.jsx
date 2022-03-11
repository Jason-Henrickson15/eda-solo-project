import './BuildNotesList.css';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from 'react-bootstrap';

function BuildList({ notes, checkDeleteNote }) {

    const history = useHistory();
    const dispatch = useDispatch();

    function goToDetails(noteID) {
        console.log('this is the noteID', noteID);
        dispatch({ type: 'FETCH_DETAILS', payload: noteID });
        dispatch({ type: 'FETCH_IMAGES', payload: noteID });
        history.push('/viewDetails');
    }

    function goToEditDetails(noteID) {
        console.log('this is the noteID', noteID);
        dispatch({ type: 'FETCH_DETAILS', payload: noteID });
        dispatch({ type: 'FETCH_IMAGES', payload: noteID });
        history.push('/editDetails');
    }

    function checkPriority(priority) {
        if (priority === 1) {
            return (
                <p className='severe'>Severe</p>
            )
        }
        else if (priority === 2) {
            return (
                <p className='moderate'>Moderate</p>
            )
        }
        else if (priority === 3) {
            return (
                <p className='low'>Low</p>
            )
        }
    }

    function checkType(note) {
        if (note.type === 'problem') {
            if (note.solved === true) {
                return (
                    <div className='status'>Status: {solved}</div>
                )
            }
            else if (note.solved === false) {
                return (
                    <div className='status'>Status: {unsolved}</div>
                )
            }
        }
    }

    const solved = <p className='solved'>Solved</p>
    const unsolved = <p className='unsolved'>Unsolved</p>


    return (
        <div className="listContainer">
            {notes.map(note => {
                return (
                    <div key={note.id} className="noteItem">
                        <img className='thumbnail' src={note.thumbnail} />
                        <div className='detailsContainer'>
                            <h3>Title: {note.title}</h3>
                            <p className='priorityContainer'>Priority: {checkPriority(note.priority)}</p>
                            <p className='typeContainer'>Type: {note.type}</p>
                            {checkType(note)}
                        </div>
                        <div className='buttonContainer'>
                            <Button onClick={() => goToDetails(note.id)} className='notesBtns details'>View Details</Button>
                            <Button onClick={() => goToEditDetails(note.id)} className='notesBtns edit'>Edit</Button>
                        </div>
                        <i onClick={() => checkDeleteNote(note.id)} class="bi bi-trash deleteIcon"></i>
                    </div>
                )
            })}
        </div>
    )
}

export default BuildList;