import './NoteBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function NoteBox({note,updateMyStatus,updateMyArchive,onUpdate}) {
    const [isExpanded, setIsExpanded] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const [noteToUpdate, setNoteToUpdate] = useState({
      id: note.id,
      content: note.content,
      type: note.type,
      status: note.status,
      deadline: note.deadline
    });

    const toggleIsExpanded = () => setIsExpanded(!isExpanded);
    const toggleIsEditMode = () => setIsEditMode(!isEditMode);

    function getFontAwesomeIconByType() {
        var ico = "fa-question";
        if (note.type === "unknown") { ico = "fa-circle-question"; }
        if (note.type === "beer") { ico = "fa-beer-mug-empty"; }
        if (note.type === "bills") { ico = "fa-money-bill"; }
        if (note.type === "delivery") { ico = "fa-truck-fast"; }
        if (note.type === "family") { ico = "fa-people-roof"; }
        if (note.type === "health") { ico = "fa-notes-medical"; }
        if (note.type === "hobby") { ico = "fa-gamepad"; }
        if (note.type === "house") { ico = "fa-house"; }
        if (note.type === "shop") { ico = "fa-cart-shopping" }
        if (note.type === "travel") { ico = "fa-car-side"; }
        if (note.type === "work") { ico = "fa-briefcase"; }
        return ico;
    }

    function isNoteChanged() {
      const isNoteChangedWithUpdate = note.type !== noteToUpdate.type
          || note.content !== noteToUpdate.content
          || note.deadline !== noteToUpdate.deadline;
      return isNoteChangedWithUpdate;      
    }

    const handleExpanedChange = () => {
      if (isEditMode) {
        toggleIsEditMode();
      }
      toggleIsExpanded();
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      onUpdate(noteToUpdate);
      toggleIsEditMode();
    };

    const handleCancel = () => {
      setNoteToUpdate(note);
      toggleIsEditMode();
    };
    
    return (
    <div className="card text-center mb-3 mt-3">
      <div className="card-header">
        <button title={note.type} onClick={handleExpanedChange} className="btn btn-lg rounded-pill">
          <FontAwesomeIcon icon={getFontAwesomeIconByType()} size="3x" />
        </button>
      </div>
      {isExpanded && 
      <div>
        {isEditMode && note.status !== "not_doing" && note.status !== "done" ?
        (<div className="card-body">
          <div>#{note.id}</div>
          <h6 className="card-text">{note.status.toUpperCase()}</h6>
          <form onSubmit={handleSubmit} className="p-3 bg-secondary mt-3 mb-3">
            <div>
              <label htmlFor="type" className="form-label">Type</label>
                <select
                  id="type"
                  className="form-select"
                  value={noteToUpdate.type}
                  onChange={(e) => setNoteToUpdate({ ...noteToUpdate, type: e.target.value })}
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
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                className="form-control"
                id="content"
                rows="3"
                value={noteToUpdate.content}
                onChange={(e) => setNoteToUpdate({ ...noteToUpdate, content: e.target.value })}
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="deadline" className="form-label">Deadline</label>
              <input
                type="datetime-local"
                className="form-control"
                id="deadline"
                value={noteToUpdate.deadline}
                onChange={(e) => setNoteToUpdate({ ...noteToUpdate, deadline: e.target.value })}
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <button title="cancel" type="button" onClick={handleCancel} className="btn btn-sm rounded-pill">&nbsp;<FontAwesomeIcon icon="fa-backward-step" size="3x" />&nbsp;</button>
                <button title="submit" type="submit" className="btn btn-sm rounded-pill" disabled={!isNoteChanged()}>&nbsp;<FontAwesomeIcon icon="fa-floppy-disk" size="3x" />&nbsp;</button>
              </div>
            </div>
          </form>
          <div>
            {note.updatedAt && (<div>Updated: {new Date(note.updatedAt + ' UTC').toLocaleString()}</div>)}
            <div>Created: {new Date(note.createdAt + ' UTC').toLocaleString()}</div>
          </div>
        </div>) :
        (<div className="card-body">
          <div>#{note.id}</div>
          <h6 className="card-text">{note.status.toUpperCase()}</h6>
          <h5 className="card-title display-6 mt-3 mb-4">{note.content}</h5>
          {note.deadline && (<div style={{color:"#FFA500"}}><b>Deadline: {new Date(note.deadline + ' UTC').toLocaleString()}</b></div>)}
          {note.updatedAt && (<div>Updated: {new Date(note.updatedAt + ' UTC').toLocaleString()}</div>)}
          <div>Created: {new Date(note.createdAt + ' UTC').toLocaleString()}</div>
          {note.status !== "not_doing" && note.status !== "done" && (<button title="edit" onClick={toggleIsEditMode} className="btn btn-sm rounded-pill mt-3"><FontAwesomeIcon icon="fa-pen-to-square" size="lg" /></button>)}
        </div>)}
        <div className="card-footer text-muted">
          <div className="row">
            <div className="col-12">
              {(note.status === "not_doing") && (note.isArchived === 0) && (<button title="todo" onClick={() => updateMyStatus(note.id, 'todo')} className="btn btn-sm btn-light rounded-pill">&nbsp;<FontAwesomeIcon icon="fa-backward-step" size="3x" />&nbsp;</button>)}
              {(note.status === "todo" || note.status === "on_hold") && (note.isArchived === 0) && (<button title="do" onClick={() => updateMyStatus(note.id, 'doing')} className="btn btn-sm btn-light rounded-pill">&nbsp;<FontAwesomeIcon icon="fa-play" size="3x" />&nbsp;</button>)}
              {(note.status === "todo" || note.status === "doing") && (note.isArchived === 0) && (<button title="hold" onClick={() => updateMyStatus(note.id, 'on_hold')} className="btn btn-sm btn-light rounded-pill"><FontAwesomeIcon icon="fa-pause" size="3x" /></button>)}
              {(note.status === "todo" || note.status === "doing" || note.status === "on_hold") && (note.isArchived === 0) && (<button title="cancel" onClick={() => updateMyStatus(note.id, 'not_doing')} className="btn btn-sm btn-light rounded-pill"><FontAwesomeIcon icon="fa-ban" size="3x" /></button>)}
              {(note.status === "todo" || note.status === "doing" || note.status === "on_hold" || note.status === "not_doing") && (note.isArchived === 0) && (<button title="complete" onClick={() => updateMyStatus(note.id, 'done')} className="btn btn-sm btn-light rounded-pill"><FontAwesomeIcon icon="fa-circle-check" size="3x" /></button>)}
              {(note.status === "done" || note.status === "not_doing") && (note.isArchived === 0) && (<button title="archive" onClick={() => updateMyArchive(note.id, 1)} className="btn btn-sm rounded-pill">&nbsp;<FontAwesomeIcon icon="fa-file-zipper" size="3x" />&nbsp;</button>)}
              {(note.status === "not_doing") && (note.isArchived === 1) && (<button title="unarchive" onClick={() => updateMyArchive(note.id, 0)} className="btn btn-sm rounded-pill">&nbsp;<FontAwesomeIcon icon="fa-rotate-left" size="3x" />&nbsp;</button>)}
              <button title="delete" onClick={() => updateMyStatus(note.id, 'DELETE!')} className="btn btn-sm rounded-pill"><FontAwesomeIcon icon="fa-trash" size="3x" /></button>
            </div>
          </div>
        </div>
      </div>}
    </div>
    )
}

export default NoteBox;
