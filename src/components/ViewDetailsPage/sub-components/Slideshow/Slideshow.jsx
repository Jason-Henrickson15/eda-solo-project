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

    const next = '=>';
    const prev = '<=';

    return (
        <>
            <div className='imageContainer'>
                <img className='slideShowImages' src={images[index]?.path} />
                <button onClick={changeImageNext} className='slideShowBtn next'>{next}</button>
                <button onClick={changeImagePrev} className='slideShowBtn prev'>{prev}</button>
            </div>
            
        </>
    )
}

export default Slideshow;