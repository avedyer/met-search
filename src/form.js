import { useEffect, useState } from "react"

export default function Form() {

  const [filters, setFilters] = useState([])

  const [q, setQ] = useState()  

  useEffect(() => {
    setFilters([`q=${q}`])
  }, [q])

  async function searchCollection() {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?'

    filters.forEach(filter => url += filter)

    console.log(url)

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      return data
    }

    catch (err) {
      return false
    }
  }

  function displayResultsAsJSON() {
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
      <input type='text' onChange={(e) => setQ(e.target.value)} placeholder='search terms'/>
      <button onClick={(e) => {e.preventDefault(); displayResultsAsJSON()}}>Submit</button>
    </form>
  )
}