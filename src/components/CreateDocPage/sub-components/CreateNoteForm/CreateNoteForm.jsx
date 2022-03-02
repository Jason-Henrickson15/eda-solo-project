import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';


function CreateNote({ carID }) {

    const dispatch = useDispatch();
    const history = useHistory();

    let images = [];
    const [imageArray, setImageArray] = useState([]);
    const [imageCount, setImageCount] = useState(images.length);
    const [title, setTitle] = useState('');
    const type = "note";
    const [priority, setPriority] = useState('');
    const [text, setText] = useState('');

    const noteID = useSelector(store => store.noteID)

    function submitNote() {
        console.log('in submitNote');
        dispatch({ type: 'SUBMIT_NOTE', payload: { car_id: carID, title, type, priority, text, solved: true } })
        setUpload(true);
    }

    function submitImage() {
        console.log('this is the noteID in submitImage', noteID);
        for (let path of imageArray) {
            dispatch({ type: 'SUBMIT_IMAGE', payload: {path, noteID} })
        }
        history.push('/submitLanding')
    }

    function populateImagesArr(path) {
        images.push(path);
        setImageArray(images);
        setImageCount(images.length);
    }

    function uploadImages() {
        console.log('in uploadImages');
        images = [];
        cloudinaryWidget();
        setSubmitImagesBtn(true);
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
                    populateImagesArr(result.info.secure_url) // Send URLs
                }
            }
        ).open();
    }

    const [upload, setUpload] = useState(false);
    const displayUpload =
    <>
            <p>{imageCount} images selected</p>
            <button onClick={uploadImages}>Upload Images</button>
        </>
    const hideUpload = <></>

    const [submitImagesBtn, setSubmitImagesBtn] = useState(false);
    const showBtn = <button onClick={submitImage}>Submit Images</button>
    const hideBtn = <></>


    return (
        <>
            <h2>Create New Note Form:</h2>
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
            {upload ? displayUpload : hideUpload}
            {submitImagesBtn ? showBtn : hideBtn}
        </>
    );
}

export default CreateNote;