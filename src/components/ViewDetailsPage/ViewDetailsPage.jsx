import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Slideshow from './sub-components/Slideshow/Slideshow';
import './ViewDetailsPage.css';

import { Button } from 'react-bootstrap';

import { useEffect } from 'react';

function ViewDetailsPage() {
    const history = useHistory();

    const note = useSelector(store => store.details);
    const images = useSelector(store => store.images);


    useEffect(() => {
        console.log('this is the note', note);
    }, []);

    function checkPriority(priority) {
        if (priority === 1) {
            return (
                <p>Priority:<span className='severe'>Severe</span></p>
            )
        }
        else if (priority === 2) {
            return (
                <p>Priority:<span className='moderate'>Moderate</span></p>
            )
        }
        else if (priority === 3) {
            return (
                <p>Priority:<span className='low'>Low</span></p>
            )
        }
    }

    const noteType =
        <div className='textContainer'>
            <h4 className='textHeader'>Text:</h4>
            <p>{note?.text}</p>
        </div>

    const noSol = <p>There is currently no solution for this problem.</p>

    const problemType =
        <>
            <div className='textContainer'>
                <h4 className='textHeader'>Problem:</h4>
                <p>{note?.problem}</p>
            </div>
            <div className='textContainer'>
                <h4 className='textHeader'>Solution:</h4>
                {note.solution !== null ? note.solution : noSol}
            </div>
        </>

    return (
        <>
            <Slideshow images={images} />
            <div className='infoContainer'>
                <div className='titleContainer'>
                    <h2>{note?.title}</h2>
                </div>
                {note?.problem === null ? noteType : problemType}
                {checkPriority(note?.priority)}
                <Button className='goBack' onClick={() => { history.goBack() }}>Go Back</Button>
            </div>
        </>
    )
}

export default ViewDetailsPage;