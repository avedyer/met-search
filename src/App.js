import Form from './form';
import Results from './results';

import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [results, setResults] = useState([])

  return (
    <div className="App">
      <Form passResults={setResults}/>
      <Results results={results} />
    </div>
  );
}

export default App;
