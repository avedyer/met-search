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
  }, [props.query, props.pageIndex])

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
    setTrimmedObjIDs([...objIDs.slice((props.resultsPerPage * props.pageIndex), (props.resultsPerPage * props.pageIndex) + props.resultsPerPage)])
  }, [props.pageIndex, objIDs, props.resultsPerPage])

  return (
    <div id='results'>
      <div id='deck'>
        {trimmedObjIDs.map(id => <Card id={id} /> )}
      </div>
      <PageSelector query={props.query} pageCount={Math.ceil(objIDs.length / props.resultsPerPage)}/>
    </div>
  )
}