import { useEffect, useState } from "react";
import Card from "./card";
import PageSelector from "./pageSelector";

export default function Results(props) {

  const [objIDs, setObjIDs] = useState([])
  const [trimmedObjIDs, setTrimmedObjIDs] = useState([])

  useEffect(() => {
    setObjIDs([])
    if (props.query) {
      searchCollection(props.query)
    }
  }, [props.query, props.offset])

  async function searchCollection(query) {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/search?' + query

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      setObjIDs([...data.objectIDs])
    }

    catch (err) {
      return false
    }
  }

  useEffect(() => {
    if (props.imageFilter) {
      filterObjects()
    }
    else {
      setTrimmedObjIDs([...objIDs.slice(props.offset, props.offset + props.resultsPerPage)])
    }
  }, [props.offset, objIDs, props.resultsPerPage])

  async function filterObjects() {
    let filteredArr = []

    let index = props.offset
    let hardStop = 150

    while (filteredArr.length < props.resultsPerPage) {

      let data = await fetchObjData(objIDs[index])

      console.log(data)

      if (data.primaryImage || data. primaryImageSmall) {
        filteredArr.push(data.objectID)
      }

      ++index
      --hardStop

      if (index === objIDs.length || hardStop === 0) {
        break
      }
    }
    
    console.log(filteredArr)
    setTrimmedObjIDs([...filteredArr])
  }

  async function fetchObjData(id) {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      return data
    }

    catch (err) {
      return false
    }
  }


  return (
    <div id='results'>
      <div id='deck'>
        {trimmedObjIDs.map(id => <Card id={id} /> )}
      </div>
      <PageSelector resultsPerPage={props.resultsPerPage} query={props.query} pageCount={Math.ceil(objIDs.length / props.resultsPerPage)}/>
    </div>
  )
}