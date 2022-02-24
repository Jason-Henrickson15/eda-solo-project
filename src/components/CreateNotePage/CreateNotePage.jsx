import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


function CreateNote() {
    // Allows the user to create a note to store in the database

    const [selectedYear, setSelectedYear] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_YEARS' });
    }, []);

    const years = useSelector(store => store.years);
    const makes = useSelector(store => store.makes);
    const models = useSelector(store => store.models);

    function getMakes(year) {
        if (year!=='Select Year') {
            setSelectedYear(year);
            dispatch({ type: 'FETCH_MAKES', payload: year })
        }
    }

    function getModels(make) {
        if (make!=='Select Model') {
            dispatch({ type: 'FETCH_MODELS', payload: {year: selectedYear, make} })
        }
    }

    return (
        <>
            <h1>Select vehicle to create note</h1>
            <select onChange={(event) => getMakes(event.target.value)}>
                {/*Displays all years as options*/}
                <option >Select Year</option>
                {years.map(year => {
                    return (
                        <option key={year.year}>{year.year}</option>
                    )
                })}
            </select>

            <select onChange={(event) => getModels(event.target.value)}>
                {/*Displays all Makes depending on selected year*/}
                <option>Select Make</option>
                {makes.map(make => {
                    return (
                        <option key={make.make}>{make.make}</option>
                    )
                })}
            </select>

            <select>
                {/*Displays all Models depending on selected year and make*/}
                <option>Select Model</option>
                {models.map(model => {
                    return (
                        <option key={model.model}>{model.model}</option>
                    )
                })}
            </select>
        </>
    )
}

export default CreateNote;