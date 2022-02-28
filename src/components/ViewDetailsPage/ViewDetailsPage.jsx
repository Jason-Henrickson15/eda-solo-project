import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ViewDetailsPage() {
    const history = useHistory();

    const noteData = useSelector(store => store.details);
    const note = noteData[0];

    return (
        <>
            <ul>
                <li>{note?.title}</li>
                <li>{note?.text}</li>
                <li>{note?.priority}</li>
            </ul>
            <button onClick={() => {history.goBack()}}>Go Back</button>
        </>
    )
}

export default ViewDetailsPage;