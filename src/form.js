import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Form(props) {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('')
  
  function submitSearch() {
    navigate(`/search/q=${keyword}/0`)
  }


  return (
    <form>
      <label htmlFor='keywordInput'>Keyword</label>
      <input id='keywordInput' type='text' onChange={(e) => setKeyword(e.target.value)} />
      <button disabled={keyword.length === 0} onClick={(e) => {e.preventDefault(); submitSearch()}}>Submit</button>
      <label hmtlFor='rpp-selector' >Results Per Page</label> 
      <select id='rpp-selector' defaultValue={props.defaultRPP} onChange={(e) => {props.passResultsPerPage(e.target.value)}}>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </form>
  )
}