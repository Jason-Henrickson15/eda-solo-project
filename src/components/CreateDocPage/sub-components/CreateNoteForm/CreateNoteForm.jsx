import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './CreateNoteForm.css';

import PrioritySelector from './sub-components/PrioritySelector/PrioritySelector';


function CreateNote({ carID }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [title, setTitle] = useState('');
    const type = "note";
    const [priority, setPriority] = useState('');
    const [text, setText] = useState('');

    const noteID = useSelector(store => store.noteID)

    function submitNote() {
        console.log('in submitNote');
        if (title.length===0 || text.length===0 || priority==='') {
            alert('Must enter data to continue')
        }
        else {
            dispatch({ type: 'SUBMIT_NOTE', payload: { car_id: carID, title, type, priority, text, solved: true } })
            history.push('/submitImages')
        }
    }

    return (
        <>
            <h2>Create New Note Form:</h2>
            <div className='createFormContainer'>
                <input className='titleInput' placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                <br />
                <textarea className='textInput' placeholder="Note..." onChange={(event) => setText(event.target.value)} />
                <br />
                <div className='radioContainer'>
                    <h4 className='radioHead'>Priority:</h4>
                    <div className='radioBtns'>
                        <PrioritySelector priority={priority} setPriority={setPriority} />
                    </div>
                </div>
                <Button className='submitBtn' variant='primary' onClick={submitNote}>Submit</Button>
            </div>
        </>
    );
}

export default CreateNote;