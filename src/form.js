import { useEffect, useState } from "react"

export default function Form(props) {

  const [keyword, setKeyword] = useState('')
  const [resultsPerPage, setResultsPerPage] = useState(20)

  useEffect(() => {
    props.passResultsPerPage(resultsPerPage)
  }, [resultsPerPage])

  return (
    <form>
      <label for='keywordInput'>Keyword</label>
      <input id='keywordInput' type='text' onChange={(e) => setKeyword(e.target.value)} />
      <button disabled={keyword.length === 0} onClick={(e) => {e.preventDefault(); props.passQuery(keyword)}}>Submit</button>
    </form>
  )
}