import './App.css';

import Form from './form';
import Results from './results'

import { useEffect, useState } from 'react';

export default function Main() {

  const [objectIDs, setObjectIDs] = useState([])
  const [resultsPerPage, setResultsPerPage] = useState(20)

  useEffect(() => {
    console.log(objectIDs)
  }, [objectIDs])

  return (
    <div className="App">
      <Form passObjectIDs={setObjectIDs} passResultsPerPage={setResultsPerPage}/>
      <Results objectIDs={objectIDs} resultsPerPage={resultsPerPage}/>
    </div>
  )
}