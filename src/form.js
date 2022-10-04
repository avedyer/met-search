import { useEffect, useState } from "react"

export default function Form(props) {

  const [keyword, setKeyword] = useState('')
  const [objectIDs, setobjectIDs] = useState([])

  useEffect(() => {
    props.passobjectIDs([...objectIDs])
  }, [objectIDs])

  async function searchCollection() {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?' + 'q=' + keyword

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      setobjectIDs([...data.objectIDs])
    }

    catch (err) {
      return false
    }
  }

  function displayobjectIDsAsJSON() {
    searchCollection().then((result) => {
      var myjson = JSON.stringify(result, null, 2);
      var newTab = window.open();
      newTab.document.open();
      newTab.document.write('<html><body><pre>' + myjson + '</pre></body></html>');
      newTab.document.close();
    })
  }

  return (
    <form>
      <label for='keywordInput'>Keyword</label>
      <input id='keywordInput' type='text' onChange={(e) => setKeyword(e.target.value)} />
      <button disabled={keyword.length === 0} onClick={(e) => {e.preventDefault(); searchCollection()}}>Submit</button>
    </form>
  )
}