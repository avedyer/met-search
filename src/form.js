import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Form(props) {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('')
  const [resultsPerPage, setResultsPerPage] = useState(20)

  function submitSearch() {
    navigate(`/search/q=${keyword}/0`)
  }

  useEffect(() => {
    props.passResultsPerPage(resultsPerPage)
  }, [resultsPerPage])

  return (
    <form>
      <label htmlFor='keywordInput'>Keyword</label>
      <input id='keywordInput' type='text' onChange={(e) => setKeyword(e.target.value)} />
      <button disabled={keyword.length === 0} onClick={(e) => {e.preventDefault(); submitSearch()}}>Submit</button>
    </form>
  )
}