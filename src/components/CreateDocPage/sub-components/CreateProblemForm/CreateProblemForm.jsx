import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from 'react-bootstrap';

import './CreateProblemForm.css';

import SolvedSelector from './sub-components/SolvedSelector/SolvedSelector';
import PrioritySelector from './sub-components/PrioritySelector/PrioritySelector';



function CreateProblem({ carID }) {

    const dispatch = useDispatch();
    const history = useHistory();

    let images = [];
    const [imageArray, setImageArray] = useState([]);
    const [imageCount, setImageCount] = useState(images.length);
    const [title, setTitle] = useState('');
    const type = "problem";
    const [priority, setPriority] = useState('');
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [solved, setSolved] = useState();

    const noteID = useSelector(store => store.noteID)

    function submitProblem() {
        console.log('in submitProblem');
        if (title.length===0 || problem.length===0 || priority==='' || solved===undefined) {
            alert('Must enter all data to continue')
        }
        else {
            dispatch({ type: 'SUBMIT_PROBLEM', payload: { car_id: carID, title, type, priority, problem, solution, solved } })
            history.push('/submitImages')
        }
    }

    return (
        <>
            <h2>Create New Note Form:</h2>
            <div className='createFormContainer'>
                <input className='titleInput' placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
                <br />
                <textarea className='problemInput' placeholder="Problem..." onChange={(event) => setProblem(event.target.value)} />
                <br />
                <textarea className='solutionInput' placeholder="Solution..." onChange={(event) => setSolution(event.target.value)} />
                <br />
                <div className='solvedRadioContainer'>
                    <h4 className='solvedRadioHead'>Status:</h4>
                    <div className='solvedRadioBtns'>
                        <SolvedSelector solved={solved} setSolved={setSolved}/>
                    </div>
                </div>
                <div className='priorityRadioContainer'>
                    <h4 className='priorityRadioHead'>Priority:</h4>
                    <div className='priorityRadioBtns'>
                        <PrioritySelector priority={priority} setPriority={setPriority} />
                    </div>
                </div>
                <Button className='submitBtn' variant='primary' onClick={submitProblem}>Submit</Button>
            </div>
        </>
    );
}

export default CreateProblem;