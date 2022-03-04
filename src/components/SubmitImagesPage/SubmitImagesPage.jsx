import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './SubmitImagesPage.css';

function SubmitImagesPage() {

    const dispatch = useDispatch();
    const history = useHistory();

    let images = [];
    const [imageArray, setImageArray] = useState([]);
    const [imageCount, setImageCount] = useState(images.length);

    const noteID = useSelector(store => store.noteID);

    function uploadImages() {
        console.log('in uploadImages');
        images = [];
        cloudinaryWidget();
    }

    function submitImage() {
        // console.log('this is the noteID in submitImage', noteID);
        // for (let path of imageArray) {
        //     dispatch({ type: 'SUBMIT_IMAGE', payload: { path, noteID } })
        // }
        dispatch({ type: 'SUBMIT_THUMBNAIL', payload: { thumbnail: imageArray[0], noteID } })
        history.push('/submitLanding')
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

    function populateImagesArr(path) {
        images.push(path);
        setImageArray(images);
        setImageCount(images.length);
    }

    function next() {
        if (index===imageArray.length-1) {
            setIndex(0);
        }
        else {
            setIndex(index+1);
        }
    }

    function prev() {
        if (index===0) {
            setIndex(imageArray.length-1)
        }
        else {
            setIndex(index-1);
        }
    }

    const submitImages =
        <>
            <h4 className='imageCount'>{imageCount} images selected</h4>
            <br />
            <Button onClick={submitImage} className="submitImages">Submit Images</Button>
        </>

    const [index, setIndex] = useState(0);
    const displayImages =
        <div className='slideshowContainer'>
            <i onClick={prev} className="bi bi-arrow-left-circle-fill arrow left"></i>
            <div className='displayImagesContainer'>
                <img className="prevImage" src={imageArray[index]} />
            </div>
            <i onClick={next} className="bi bi-arrow-right-circle-fill arrow right"></i>
        </div>


    return (
        <div className="submitImagesContainer">
            <div className='submitImagesForm'>
                <h2>Submit Images Here:</h2>
                <div className='buttonContainer'>
                    <Button className='selectImages' onClick={uploadImages}>Select Images</Button>
                    <Button variant='outline-primary' className='continue' onClick={() => history.push('/submitLanding')}>Continue Without Images</Button>
                </div>
                {imageCount > 0 ? displayImages : <></>}
                {imageCount > 0 ? submitImages : <></>}
            </div>
        </div>
    )
}

export default SubmitImagesPage;