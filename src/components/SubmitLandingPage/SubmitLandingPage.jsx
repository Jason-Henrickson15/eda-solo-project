import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { useHistory } from 'react-router-dom';

function SubmitLandingPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch({ type: 'SET_NOTES', payload: [] });
    },[]);
    return (
        <>
            <Alert variant="success">
                <Alert.Heading>Success!</Alert.Heading>
                <p>
                    Your document has been successfully submitted!
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => history.push('/')} variant="outline-success">
                        Return Home
                    </Button>
                    <Button onClick={() => history.push('/viewNotes')} variant="outline-success">
                        View Notes
                    </Button>
                    <Button onClick={() => history.push('/createDoc')} variant="outline-success">
                        Create Another Note
                    </Button>
                </div>
            </Alert>
        </>
    );
}

export default SubmitLandingPage;