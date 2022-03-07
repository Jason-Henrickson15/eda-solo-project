import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './UserPage.css';

function UserPage() {

  const history = useHistory();

  return (
    <div className="container">
      <h1>Let's Get Started!</h1>
      <div className='btnContainer'>
        <Button className='btn' onClick={() => history.push('/createDoc')}>Create Document</Button>
        <Button className='btn' onClick={() => history.push('/viewNotes')}>View Documents</Button>
      </div>
    </div>
  );
}

export default UserPage;