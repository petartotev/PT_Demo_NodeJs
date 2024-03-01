import './Notebook.css';
import React, { useEffect, useState } from 'react';
import { getAllNotes, updateNoteStatusById, updateNoteArchiveById, deleteNoteById, postNote } from '../../clients/note-app-server.js';
import NoteBox from '../NoteBox/NoteBox.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoteCreateForm from '../NoteCreateForm/NoteCreateForm.js';

function Notebook(token) {
    const [notes, setNotes] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showArchived, setShowArchived] = useState(false);

    async function updateNoteStatus(id, status) {
        try {
            if (status === 'DELETE!') {
                await deleteNoteById(id, token.authToken);
            } else {
                await updateNoteStatusById(id, status, token.authToken);
            }
            
            const updatedNotes = await getAllNotes(token.authToken);
            setNotes(updatedNotes.data); // Update the notes state with the updated list
        } catch (error) {
            console.error('Error archiving note:', error);
        }
    }

    async function updateNoteArchive(id, isArchived) {
        try {
            await updateNoteArchiveById(id, isArchived, token.authToken);
            
            const updatedNotes = await getAllNotes(token.authToken);
            setNotes(updatedNotes.data); // Update the notes state with the updated list
        } catch (error) {
            console.error('Error archiving note:', error);
        }
    }

    const handleCreateNoteSubmit = async (noteData) => {
        // Implement note creation logic here
        // For example, using the postNote function you will create next
        try {
            if (noteData.status === null || noteData.status === undefined) {
                noteData.status = "todo";
            }
            await postNote(noteData, token.authToken);
            const updatedNotes = await getAllNotes(token.authToken);
            setNotes(updatedNotes.data);
            setShowForm(false); // Hide form on successful creation
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    function handleCreateNotCancel() {
        setShowForm(false);   
    }

    const toggleArchivedVisibility = () => setShowArchived(!showArchived);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await getAllNotes(token.authToken);
                setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };
        if (token.authToken) fetchNotes(); // Only fetch notes if token is set
    }, [token.authToken]); // Re-fetch notes when token changes

    if (notes === null) {
      return <div>Loading...</div>; // Handle loading state
    }
  
    const sections = {
        TODO: notes.filter(note => note.isArchived === 0 && note.status === 'todo'),
        DOING: notes.filter(note => note.isArchived === 0 && note.status === 'doing'),
        ON_HOLD: notes.filter(note => note.isArchived === 0 && note.status === 'on_hold'),
        NOT_DOING: notes.filter(note => note.isArchived === 0 && note.status === 'not_doing'),
        DONE: notes.filter(note => note.isArchived === 0 && note.status === 'done')
    };

    return (
        <div>
            {!showForm && <button className="btn btn-dark rounded-pill" onClick={() => setShowForm(!showForm)}><FontAwesomeIcon icon="fa-plus" size="5x" /></button>}
            {showForm && <NoteCreateForm onCreate={handleCreateNoteSubmit} cancelCreate={handleCreateNotCancel} />}
            {notes !== null && Object.entries(sections).map(([status, sectionNotes]) => (
                <div key={status}>
                    <hr />
                    <h2 className="display-3">{status}</h2>
                    {sectionNotes.map(note => (<NoteBox key={note.id} note={note} updateMyStatus={updateNoteStatus} updateMyArchive={updateNoteArchive} />))}
                </div>
            ))}
            <div key="ARCHIVED">
                <hr />
                <h2 className="display-3">ARCHIVED</h2>
                {showArchived && notes.filter(note => note.isArchived === 1).map(note => (<NoteBox key={note.id} note={note} updateMyStatus={updateNoteStatus} updateMyArchive={updateNoteArchive} />))}
            </div>
            <div className="d-flex justify-content-center">
                <div className="form-check form-switch fs-4">
                    <input className="form-check-input" type="checkbox" id="archivedToggle" checked={showArchived} onChange={toggleArchivedVisibility} role="switch" />
                </div>
            </div>
        </div>
    );
}

export default Notebook;