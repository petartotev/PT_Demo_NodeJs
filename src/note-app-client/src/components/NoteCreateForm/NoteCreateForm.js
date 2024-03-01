import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NoteCreateForm({ onCreate, cancelCreate }) {
    const [note, setNote] = useState({
        content: '',
        type: 'unknown', // default type
        deadline: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(note);
    };

    function isFormContentEmpty() {
        console.log("Note is " + note.content + ".");
        return note.content === null || note.content === undefined || note.content === '' || note.content === ' ';
    }

    return (
        <div className="card bg-warning text-center mb-3 mt-3">
            <div className="card-header">
                <button title="cancel" onClick={cancelCreate} className="btn rounded-pill">
                    <FontAwesomeIcon icon="fa-plus" size="5x" />
                </button>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="type" className="form-label">Type</label>
                            <select
                                id="type"
                                className="form-select"
                                value={note.type}
                                onChange={(e) => setNote({ ...note, type: e.target.value })}
                            >
                                <option value="unknown">Unknown</option>
                                <option value="beer">Beer</option>
                                <option value="bills">Bills</option>
                                <option value="delivery">Delivery</option>
                                <option value="family">Family</option>
                                <option value="health">Health</option>
                                <option value="hobby">Hobby</option>
                                <option value="house">House</option>
                                <option value="shop">Shop</option>
                                <option value="travel">Travel</option>
                                <option value="work">Work</option>
                            </select>
                        </div>
                        <div className="col-6">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                id="status"
                                className="form-select"
                                value={note.status}
                                onChange={(e) => setNote({ ...note, status: e.target.value })}
                            >
                                <option value="todo">TODO</option>
                                <option value="doing">Doing</option>
                                <option value="on_hold">On Hold</option>
                                <option value="not_doing">Not Doing</option>
                                <option value="done">Done</option>
                                <option value="archived">Archived</option>
                            </select>                          
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Content</label>
                        <textarea
                            className="form-control"
                            id="content"
                            rows="3"
                            value={note.content}
                            onChange={(e) => setNote({ ...note, content: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="deadline" className="form-label">Deadline</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            id="deadline"
                            value={note.deadline}
                            onChange={(e) => setNote({ ...note, deadline: e.target.value })}
                            min={new Date().toISOString().slice(0, 16)}
                        />
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <button title="cancel" type="button" onClick={cancelCreate} className="btn btn-sm rounded-pill">&nbsp;<FontAwesomeIcon icon="fa-backward-step" size="3x" />&nbsp;</button>
                            <button title="submit" type="submit" className="btn btn-sm rounded-pill" disabled={isFormContentEmpty()}>&nbsp;<FontAwesomeIcon icon="fa-floppy-disk" size="3x" />&nbsp;</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NoteCreateForm;