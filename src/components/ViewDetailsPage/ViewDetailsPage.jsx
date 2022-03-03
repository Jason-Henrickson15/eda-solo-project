import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Slideshow from './sub-components/Slideshow/Slideshow';
import './ViewDetailsPage.css';

function ViewDetailsPage() {
    const history = useHistory();

    const noteData = useSelector(store => store.details);
    const images = useSelector(store => store.images);
    const note = noteData[0];

    return (
        <>
            <Slideshow images={images} />
            <div className='infoContainer'>
                <div className='titleContainer'>
                    <h2>{note?.title}</h2>
                </div>
                <div className='textContainer'>
                    <p>{note?.text}</p>
                </div>
                <p>Priority: {note?.priority}</p>
                <button className='goBack' onClick={() => { history.goBack() }}>Go Back</button>
            </div>
        </>
    )
}

export default ViewDetailsPage;