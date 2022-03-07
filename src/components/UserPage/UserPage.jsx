import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import './UserPage.css';

function UserPage() {
  
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch({ type: 'SET_NOTES', payload: []});
  },[]);

  const history = useHistory();

  return (
    <div className="container">
      <h1 className='userPageHeader'>Let's Get Started!</h1>
      <div className='btnContainer'>
        <Button className='userPageBtn' onClick={() => history.push('/createDoc')}>Create Document</Button>
        <Button className='userPageBtn' onClick={() => history.push('/viewNotes')}>View Documents</Button>
      </div>
    </div>
  );
}

export default UserPage;