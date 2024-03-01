import './App.css';

import React, { useState } from 'react';

import Header from './components/Header/Header.js';
import Authenticator from './components/Authenticator/Authenticator.js';
import Notebook from './components/Notebook/Notebook.js';
import ScrollToTop from './components/ScrollToTop/ScrollToTop.js';
import Footer from './components/Footer/Footer.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCaretUp, faCaretDown, faTrash, faTruckFast, faQuestion, faPeopleRoof, faNotesMedical, faMoneyBill, faGamepad, faHouse, faBriefcase, faCarSide, faPlus, faPlay, faPause, faBan, faCircleCheck, faFileZipper, faFloppyDisk, faBackwardStep, faCircleQuestion, faBeerMugEmpty, faCartShopping, faRotateLeft, faEye, faEyeSlash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

// Getting the secret from a secrets.js file is a huge mistake!!!
// The .js file gets exposed in raw format in the browser!!!
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

library.add(faCaretUp, faCaretDown, faTrash, faTruckFast, faQuestion, faPeopleRoof, faNotesMedical, faMoneyBill, faGamepad, faHouse, faBriefcase, faCarSide, faPlus, faPlay, faPause, faBan, faCircleCheck, faFileZipper, faFloppyDisk, faBackwardStep, faCircleQuestion, faBeerMugEmpty, faCartShopping, faRotateLeft, faEye, faEyeSlash, faPenToSquare);

function App() {
  const [token, setToken] = useState('');

  function isTokenValid() {
    return token !== undefined && token !== null && token !== '' && token === ACCESS_TOKEN;
  }

  const setAuthorizationToken = (token) => {
    setToken(token);
  }

  return (
    <div className="App container align-items-center justify-content-center bg-dark text-light">
      <Header />
      {!isTokenValid() && <Authenticator setAuthToken={setAuthorizationToken} />}
      {isTokenValid() ? <Notebook authToken={token} /> : <div className="text-danger">Invalid API Token!</div>}
      <ScrollToTop />
      <Footer />
    </div>
  );
}

export default App;
