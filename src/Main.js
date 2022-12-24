import Form from './form';
import Results from './results'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function Main() {

  let { query, page } = useParams();

  const [resultsPerPage, setResultsPerPage] = useState(20)
  const [pageIndex, setPageIndex] = useState()

  useEffect(() => {
    setPageIndex(page)
  }, [pageIndex, page])

  return (
    <div id="main">
      <Form passResultsPerPage={setResultsPerPage}/>
      <Results query={query} pageIndex={pageIndex} resultsPerPage={resultsPerPage} passPageIndex={setPageIndex}/>
    </div>
  )
}