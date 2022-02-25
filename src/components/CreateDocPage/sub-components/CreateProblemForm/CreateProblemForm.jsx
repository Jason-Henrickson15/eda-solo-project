import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function CreateProblem({ carID }) {

    const dispatch = useDispatch();
    const history = useHistory();

    const [imagePath, setImagePath] = useState('');
    const [title, setTitle] = useState('');
    const type = "problem";
    const [priority, setPriority] = useState('');
    const [problem, setProblem] = useState('');
    const [solution, setSolution] = useState('');
    const [solved, setSolved] = useState(false);

    function submitProblem() {
        dispatch({ type: 'SUBMIT_PROBLEM', payload: {car_id: carID, title, type, priority, problem, solution, solved } })
        // dispatch for imagePath goes here
        history.push('/submitLanding')
    }

    return (
        <>
            <h2>Create New Problem Form:</h2>
            <input placeholder="Image path here" onChange={(event) => setImagePath(event.target.value)} />
            <br />
            <input placeholder="Title" onChange={(event) => setTitle(event.target.value)} />
            <br />
            <textarea placeholder="Problem..." onChange={(event) => setProblem(event.target.value)} />
            <br />
            <textarea placeholder="Solution..." onChange={(event) => setSolution(event.target.value)} />
            <br />
            <form>
                <h4>Priority:</h4>
                <input onChange={(event) => setPriority(event.target.value)} value={3} type={"radio"} id="low" name="priority" /> <label htmlFor="low">Low</label>
                <br/>
                <input onChange={(event) => setPriority(event.target.value)} value={2} type={"radio"} id="moderate" name="priority" /> <label htmlFor="moderate">Moderate</label>
                <br/>
                <input onChange={(event) => setPriority(event.target.value)} value={1} type={"radio"} id="severe" name="priority" /> <label htmlFor="severe">Severe</label>
                <br/>
                <h4>Problem Status:</h4>
                <input onChange={(event) => setSolved(event.target.value)} value={true} type={"radio"} id="true" name="solved" /> <label htmlFor="true">Solved</label>
                <br/>
                <input onChange={(event) => setSolved(event.target.value)} value={false} type={"radio"} id="false" name="solved" /> <label htmlFor="false">Unsolved</label>
            </form>
            <button onClick={submitProblem}>Submit</button>
        </>
    );
}

export default CreateProblem;