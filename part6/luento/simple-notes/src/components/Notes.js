import React from 'react';
import { connect } from 'react-redux';
import Note from './Note';
import { toggleImportanceOf } from '../reducers/noteReducer';
////Container component
const Notes = (props) => {
    console.log(props)
    return(
        <ul>
            {props.visibleNotes.map(note => 
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => props.toggleImportanceOf(note.id)}
                    />
            )}
        </ul>
    )
};

const notesToShow = ({ notes, filter }) => {
    if(filter === 'ALL') {
        return notes;
    }
    return filter === 'IMPORTANT' ? notes.filter(note => note.important) : notes.filter(note => !note.important)
}

const mapStateToProps = (state) => {
    return {
        visibleNotes: notesToShow(state),
    }
};

const mapDispatchToProps = {
    toggleImportanceOf
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);