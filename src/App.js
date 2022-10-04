import Form from './form';
import Results from './results';

import './App.css';

import { useEffect, useState } from 'react';

function App() {

  const [objectIDs, setobjectIDs] = useState([])

  return (
    <div className="App">
      <Form passobjectIDs={setobjectIDs}/>
      <Results objectIDs={objectIDs} />
    </div>
  );
}

export default App;
