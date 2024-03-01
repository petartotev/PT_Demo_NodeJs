import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ScrollToTop() {
    return (
        <button onClick={() => {window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} className="btn btn-sm btn-warning rounded-pill border opacity-50" style={{
            fontSize: '30px',
            position: 'fixed',
            bottom: '10px',
            left: '90%',
            marginLeft: '-23px'
          }}> 
            &nbsp;<FontAwesomeIcon icon="fa-caret-up" />&nbsp;
        </button>
    )
}

export default ScrollToTop;