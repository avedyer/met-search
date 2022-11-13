import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function SimpleForm(props) {

  const navigate = useNavigate();

  const [keyword, setKeyword] = useState('')

  function submitSearch() {
    navigate(`/search/q=${keyword}/0`)
  }

  return (
    <form>
      <label for='keywordInput'>Keyword</label>
      <input id='keywordInput' type='text' onChange={(e) => setKeyword(e.target.value)} />
      <button disabled={keyword.length === 0} onClick={(e) => {e.preventDefault(); submitSearch()}}>Submit</button>
    </form>
  )
}