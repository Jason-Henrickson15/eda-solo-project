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
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                        id felis metus. Vestibulum et pulvinar tortor. Morbi pharetra lacus
                        ut ex molestie blandit. Etiam et turpis sit amet risus mollis
                        interdum. Suspendisse et justo vitae metus bibendum fringilla sed
                        sed justo. Aliquam sollicitudin dapibus lectus, vitae consequat odio
                        elementum eget. Praesent efficitur eros vitae nunc interdum, eu
                        interdum justo facilisis. Sed pulvinar nulla ac dignissim efficitur.
                        Quisque eget eros metus. Vestibulum bibendum fringilla nibh a
                        luctus. Duis a sapien metus.</p>
                </div>
                <p>Priority: {note?.priority}</p>
                <button className='goBack' onClick={() => { history.goBack() }}>Go Back</button>
            </div>
        </>
    )
}

export default ViewDetailsPage;