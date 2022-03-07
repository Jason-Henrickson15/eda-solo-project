import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Slideshow.css';

function Slideshow() {

    const images = useSelector(store => store.images)
    const [index, setIndex] = useState(0);

    function changeImageNext() {
        if (index === images.length - 1) {
            setIndex(0);
        }
        else {
            setIndex(index + 1);
        }
    }

    function changeImagePrev() {
        if (index === 0) {
            setIndex(images.length - 1);
        }
        else {
            setIndex(index - 1);
        }
    }

    return (
        <>
            <div className='imageContainer'>
                <i onClick={changeImagePrev} className="bi bi-arrow-left-circle-fill arrow left"></i>
                <div className='displayImagesContainer'>
                    <img className="slideShowImages" src={images[index]?.path} />
                </div>
                <i onClick={changeImageNext} className="bi bi-arrow-right-circle-fill arrow right"></i>
            </div>
        </>
    )
}

export default Slideshow;