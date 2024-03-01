import './NoteBox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

function NoteBox({note,updateMyStatus,updateMyArchive}) {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleIsExpanded = () => setIsExpanded(!isExpanded);

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
    
    return (
    <div className="card text-center mb-3 mt-3">
      <div className="card-header">
        <button title={note.type} onClick={toggleIsExpanded} className="btn btn-lg rounded-pill">
          <FontAwesomeIcon icon={getFontAwesomeIconByType()} size="3x" />
        </button>
      </div>
      {isExpanded && 
      <div className="card-body">
        <div>
          {(note.status === "todo" || note.status === "doing" || note.status === "on_hold") && (<button title="edit" className="btn btn-sm btn-light"><FontAwesomeIcon icon="fa-pen-to-square"/></button>)}
        </div>
        <div>#{note.id}</div>
        <h6 className="card-text">{note.status.toUpperCase()}</h6>
        <h5 className="card-title display-6 mt-3 mb-4">{note.content}</h5>
        {note.deadline && (<div style={{color:"#FFA500"}}><b>Deadline: {new Date(note.deadline + ' UTC').toLocaleString()}</b></div>)}
        {note.updatedAt && (<div>Updated: {new Date(note.updatedAt + ' UTC').toLocaleString()}</div>)}
        <div>Created: {new Date(note.createdAt + ' UTC').toLocaleString()}</div>
      </div>}
      {isExpanded &&
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
      </div>}
    </div>
    )
}

export default NoteBox;
