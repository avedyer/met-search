import { useEffect, useState } from "react"

export default function Form(props) {

  const [filters, setFilters] = useState({
    q: '', 
    title: '',
    departmentId: '',
    medium: '',
    geoLocation: '',
    dateBegin: '',
    dateEnd: ''
  })
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])

  useEffect(() => {
    props.passResults([...results])
  }, [results])

  useEffect(() => {
      let newQuery = ''
      let keys = Object.keys(filters)
      keys.forEach((key, index) => {
        if (filters[key]) {
        newQuery += `${key}=${filters[key]}&`
        }
      })

      if (newQuery.charAt(newQuery.length - 1) === '&') {
        newQuery = newQuery.slice(0, -1)
      }
    setQuery(newQuery)
  }, [filters])

  function updateFilters(key, newValue) {
    let newFilterObject = filters
    newFilterObject[key] = newValue
    setFilters({...newFilterObject})
  }

  async function searchCollection() {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?' + query

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      setResults([...data.objectIDs])
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
      <label for='keywordInput'>Keyword</label>
      <input id='keywordInput' type='text' onChange={(e) => updateFilters('q', e.target.value)} />
      <label for='titleInput'>Title</label>
      <input id='titleInput' type='text' onChange={(e) => updateFilters('title', e.target.value)} />
      <label for='departmentInput'>Department</label>
      <input id='departmentInput' type='text' onChange={(e) => updateFilters('departmentId', e.target.value)} />
      <label for='mediumInput'>Medium</label>
      <input id='mediumInput' type='text' onChange={(e) => updateFilters('medium', e.target.value)} />
      <label for='locationInput'>Location</label>
      <input id='locationInput' type='text' onChange={(e) => updateFilters('geoLocation', e.target.value)} />
      <label for='startDateInput'>Date Range Start</label>
      <input id='startDateInput' type='text' onChange={(e) => updateFilters('dateBegin', e.target.value)} />
      <label for='endDateInput'>Date Range End</label>
      <input id='endDateInput' type='text' onChange={(e) => updateFilters('dateEnd', e.target.value)} />
      <button onClick={(e) => {e.preventDefault(); searchCollection()}}>Submit</button>
    </form>
  )
}