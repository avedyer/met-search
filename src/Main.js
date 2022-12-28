import Form from './form';
import Results from './results'

import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function Main() {

  let { query, offset } = useParams();

  const defaultRPP = 10

  const [resultsPerPage, setResultsPerPage] = useState()

  console.log(offset)

  useEffect(() => {
    if (!resultsPerPage) {
      setResultsPerPage(defaultRPP)
    }
  })

  return (
    <div id="main">
      <Form passResultsPerPage={setResultsPerPage} defaultRPP={defaultRPP}/>
      <Results query={query} offset={offset ? parseInt(offset) : 0} resultsPerPage={resultsPerPage ? parseInt(resultsPerPage) : defaultRPP}/>
    </div>
  )
}