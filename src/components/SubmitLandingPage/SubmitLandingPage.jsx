import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

import { useHistory } from 'react-router-dom';

function SubmitLandingPage() {
    const history = useHistory();
    return (
        <>
            <Alert variant="success">
                <Alert.Heading>How's it going?!</Alert.Heading>
                <p>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
                    lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
                    fermentum.
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => history.push('/')} variant="outline-success">
                        Return Home
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