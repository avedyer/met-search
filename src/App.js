import Form from './form';
import Results from './results';

import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [objectIDs, setObjectIDs] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(20)

  return (
    <div className="App">
      <Form passObjectIDs={setObjectIDs} passResultsPerPage={setResultsPerPage}/>
      <Results objectIDs={objectIDs} resultsPerPage={resultsPerPage}/>
    </div>
  );
}

export default App;
