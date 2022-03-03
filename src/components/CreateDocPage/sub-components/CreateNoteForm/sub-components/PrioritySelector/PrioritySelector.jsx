import { ButtonGroup, ToggleButton } from 'react-bootstrap';
import './PrioritySelector.css';

function PrioritySelector({ priority, setPriority }) {

    function checkButton(event) {
        console.log('this is the value of the clicked button',event.target.value);
        setPriority(event.target.value)
    }


    return (
        <div className='prioritySelectorContainer'>
            <ButtonGroup>
                <ToggleButton className='toggleButton'
                    key={3}
                    id={3}
                    type="radio"
                    variant='outline-success'
                    name="radio"
                    value="3"
                    checked={priority==="3"}
                    onChange={(event) => checkButton(event)}
                >
                    Low
                </ToggleButton>

                <ToggleButton className='toggleButton'
                    key={2}
                    id={2}
                    type="radio"
                    variant='outline-warning'
                    name="radio"
                    value="2"
                    checked={priority==="2"}
                    onChange={(event) => checkButton(event)}
                >
                    Moderate
                </ToggleButton>

                <ToggleButton className='toggleButton'
                    key={1}
                    id={1}
                    type="radio"
                    variant='outline-danger'
                    name="radio"
                    value="1"
                    checked={priority==="1"}
                    onChange={(event) => checkButton(event)}
                >
                    Severe
                </ToggleButton>
            </ButtonGroup>
        </div>
    );
}

export default PrioritySelector;