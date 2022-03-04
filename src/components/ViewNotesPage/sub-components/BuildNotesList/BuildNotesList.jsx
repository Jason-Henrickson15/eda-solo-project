import './BuildNotesList.css';

function BuildList({ notes, goToDetails }) {


    function checkPriority(priority) {
        if (priority === 1) {
            return (
                <p className='severe'>Severe</p>
            )
        }
        else if (priority === 2) {
            return (
                <p className='moderate'>Moderate</p>
            )
        }
        else if (priority === 3) {
            return (
                <p className='low'>Low</p>
            )
        }
    }

    function checkType(note) {
        if (note.type === 'problem') {
            if (note.solved === true) {
                return (
                    <div className='status'>Status: {solved}</div>
                )
            }
            else if (note.solved === false) {
                return (
                    <div className='status'>Status: {unsolved}</div>
                )
            }
        }
    }

    const solved = <p className='solved'>Solved</p>
    const unsolved = <p className='unsolved'>Unsolved</p>


    return (
        <div className="listContainer">
            {notes.map(note => {
                return (
                    <div onClick={() => goToDetails(note.id)} key={note.id} className="noteItem">
                        <img className='thumbnail' src={note.thumbnail} />
                        <div className='detailsContainer'>
                            <h3>Title: {note.title}</h3>
                            <p className='priorityContainer'>Priority: {checkPriority(note.priority)}</p>
                            <p className='typeContainer'>Type: {note.type}</p>
                            {checkType(note)}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BuildList;