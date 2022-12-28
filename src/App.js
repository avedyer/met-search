import Main from './Main';
import ObjectContainer from './objectContainer';

import './styles.css';

import { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search/:query/:offset' element={<Main />}/>
        <Route path='/object/:id' element={<ObjectContainer />}/>
      </Routes>
    </Router>
  )
}

export default App;
