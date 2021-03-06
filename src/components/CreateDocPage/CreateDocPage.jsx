import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CreateNoteForm from './sub-components/CreateNoteForm/CreateNoteForm.jsx';
import CreateProblemForm from './sub-components/CreateProblemForm/CreateProblemForm.jsx';

import './CreateDocPage.css';

function CreateDoc() {
    // Allows the user to create a note to store in the database
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    const years = useSelector(store => store.years);
    const makes = useSelector(store => store.makes);
    const models = useSelector(store => store.models);
    const carID = useSelector(store => store.carID);

    const [askType, setAskType] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_YEARS' });
    }, []);

    function getMakes(year) {
        if (year !== 'Select Year') {
            setSelectedYear(year);
            setAskType(false);
            dispatch({ type: 'FETCH_MAKES', payload: year });
        }
        else if (year === 'Select Year') {
            dispatch({ type: 'SET_MAKES', payload: [] })
        }
    }

    function getModels(make) {
        if (make !== 'Select Model') {
            setSelectedMake(make);
            setAskType(false);
            dispatch({ type: 'FETCH_MODELS', payload: { year: selectedYear, make } });
        }
        else if (make === 'Select Make') {
            dispatch({ type: 'SET_MODELS', payload: [] })
        }
    }

    function setModel(model) {
        if (model !== 'Select Model') {
            setSelectedModel(model)
            dispatch({ type: 'FETCH_ID', payload: { year: selectedYear, make: selectedMake, model } });
            setAskType(true);
        }
        else if (model === 'Select Model') {
            setAskType(false);
        }
    }

    const [form, setForm] = useState(<></>);
    function displayForm(option) {
        // const carObj = { id: carID, year: selectedYear, make: selectedMake, model: selectedModel }
        if (option === 'Select Type') {
            setForm(<></>);
        }
        else if (option === 'Note') {
            setForm(<CreateNoteForm carID={carID} setForm={setForm} />);
        }
        else if (option === 'Problem') {
            setForm(<CreateProblemForm carID={carID} setForm={setForm} />);
        }
    }

    // Conditional Renders
    const getType =
        <div className='selectorDocType'>
            <h3>Document Type:</h3>
            <select className='typeDropDown' onChange={(event) => displayForm(event.target.value)}>
                <option>Select Type</option>
                <option>Note</option>
                <option>Problem</option>
            </select>
        </div>

    const hideType = <></>


    return (
        <div className='createDocContainer'>
            <h1>Select vehicle to create a document</h1>
            <div className='selectorContainer'>
                <select className='ymmDropDown year' onChange={(event) => getMakes(event.target.value)}>
                    {/*Displays all years as options*/}
                    <option>Select Year</option>
                    {years.map(year => {
                        return (
                            <option key={year.year}>{year.year}</option>
                        )
                    })}
                </select>

                <select className='ymmDropDown' onChange={(event) => getModels(event.target.value)}>
                    {/*Displays all Makes depending on selected year*/}
                    <option>Select Make</option>
                    {makes.map(make => {
                        return (
                            <option key={make.make}>{make.make}</option>
                        )
                    })}
                </select>

                <select className='ymmDropDown model' onChange={(event) => setModel(event.target.value)}>
                    {/*Displays all Models depending on selected year and make*/}
                    <option>Select Model</option>
                    {models.map(model => {
                        return (
                            <option key={model.model}>{model.model}</option>
                        )
                    })}
                </select>
            </div>
            <>
                {askType ? getType : hideType}
            </>

            <>
                {form}
            </>
        </div>
    )
}

export default CreateDoc;