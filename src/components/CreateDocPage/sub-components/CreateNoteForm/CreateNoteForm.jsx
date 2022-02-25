import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';


function CreateNote({ carObj }) {

    const dispatch = useDispatch();

    const [imagePath, setImagePath] = useState('');
    const [title, setTitle] = useState('');
    const type = "note";
    const [priority, setPriority] = useState('');
    const [text, setText] = useState('');

    function submitNote() {
        dispatch({ type: 'SUBMIT_NOTE', payload: {carObj, imagePath, title, type, priority, text} })
    }

    return (
        <>
            <h2>Create Note Form:</h2>
            <input placeholder="Image path here" onChange={(event) => setImagePath(event.target.value)} />
            <br />
            <input placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
            <br />
            <textarea placeholder="Note..." onChange={(event) => setText(event.target.value)} />
            <br />
            <form>
                <input onChange={(event) => setPriority(event.target.value)} value={3} type={"radio"} id="low" name="priority" /> <label htmlFor="low">Low</label>
                <br/>
                <input onChange={(event) => setPriority(event.target.value)} value={2} type={"radio"} id="moderate" name="priority" /> <label htmlFor="moderate">Moderate</label>
                <br/>
                <input onChange={(event) => setPriority(event.target.value)} value={1} type={"radio"} id="severe" name="priority" /> <label htmlFor="severe">Severe</label>
            </form>
            <button onClick={submitNote}>Submit</button>
        </>
    );
}

export default CreateNote;