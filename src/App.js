import Main from './Main';
import Object from './object';

import './App.css';

import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  /*
  return (
    <div className="App">
      <Form passObjectIDs={setObjectIDs} passResultsPerPage={setResultsPerPage}/>
      <Results objectIDs={objectIDs} resultsPerPage={resultsPerPage}/>
    </div>
  );
  */

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/object/:id' element={<Object />}/>
      </Routes>
    </Router>
  )
}

export default App;
