import Form from './form';
import Results from './results'

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function Main() {

  let navigate = useNavigate();

  let { query, page } = useParams();

  const [keyword, setKeyword] = useState()
  const [resultsPerPage, setResultsPerPage] = useState(20)
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    if (keyword) {
      navigate(`/search/q=${keyword}/${pageIndex}`)
    }
  }, [keyword])

  return (
    <div id="main">
      <Form passQuery={setKeyword} passResultsPerPage={setResultsPerPage}/>
      <Results query={query} pageIndex={page} resultsPerPage={resultsPerPage} passPageIndex={setPageIndex}/>
    </div>
  )
}