import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './SolvedSelector.css';

function SolvedSelector({ solved, setSolved }) {

    function checkButton(event) {
        setSolved(event.target.value)
    }

    return (
        <div className='solvedSelectorContainer'>
            <ButtonGroup>
                <ToggleButton className='solvedToggleButton'
                    key='solved'
                    id='solved'
                    type="radio"
                    variant='outline-success'
                    name="solvedRadio"
                    value={true}
                    checked={solved==='true'}
                    onChange={(event) => checkButton(event)}
                >
                    Solved
                </ToggleButton>

                <ToggleButton className='solvedToggleButton'
                    key='unsolved'
                    id='unsolved'
                    type="radio"
                    variant='outline-danger'
                    name="solvedRadio"
                    value={false}
                    checked={solved==='false'}
                    onChange={(event) => checkButton(event)}
                >
                    Unsolved
                </ToggleButton>
            </ButtonGroup>
        </div>
    );
}

export default SolvedSelector;