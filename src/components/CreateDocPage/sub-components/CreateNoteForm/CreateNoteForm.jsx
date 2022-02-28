import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function CreateNote({ carID }) {

    const dispatch = useDispatch();
    const history = useHistory();

    // const [imagePath, setImagePath] = useState([]);
    let imagePaths = []
    const [title, setTitle] = useState('');
    const type = "note";
    const [priority, setPriority] = useState('');
    const [text, setText] = useState('');

    function test() {
        console.log('this is the image path',imagePaths);
    }

    function submitNote() {
        dispatch({ type: 'SUBMIT_NOTE', payload: { car_id: carID, title, type, priority, text, solved: true } })
        // dispatch for imagePath goes here
        history.push('/submitLanding')
    }

    function populatePaths(path) {
        imagePaths.push(path)
    }

    function cloudinaryWidget() {
        console.log(process.env);
        console.log('in image upload');
        cloudinary.createUploadWidget({
            sources: ['local'],    // CAN CHANGE TO ALLOW OTHER SOURCES THAN LOCAL FILES
            multiple: true,       // REMOVE TO ALLOW MULTIPLE IMAGES
            clientAllowedFormats: [],   // SET TO CORRECT FORMATS
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
        },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    console.log('Done! Here is the image info: ', result.info);
                    populatePaths(result.info.secure_url) // Send URLs
                }
            }
        ).open();
    }

    return (
        <>
            <h2>Create New Note Form:</h2>
            <button onClick={() => cloudinaryWidget()}>Upload Images</button>
            {/* <input placeholder="Image path here" onChange={(event) => setImagePath(event.target.value)} /> */}
            <br />
            <input placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
            <br />
            <textarea placeholder="Note..." onChange={(event) => setText(event.target.value)} />
            <br />
            <form>
                <h4>Priority:</h4>
                <input onChange={(event) => setPriority(event.target.value)} value={3} type={"radio"} id="low" name="priority" /> <label htmlFor="low">Low</label>
                <br />
                <input onChange={(event) => setPriority(event.target.value)} value={2} type={"radio"} id="moderate" name="priority" /> <label htmlFor="moderate">Moderate</label>
                <br />
                <input onChange={(event) => setPriority(event.target.value)} value={1} type={"radio"} id="severe" name="priority" /> <label htmlFor="severe">Severe</label>
            </form>
            <button onClick={submitNote}>Submit</button>
            <button onClick={test}>click me</button>
        </>
    );
}

export default CreateNote;