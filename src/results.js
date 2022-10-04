import { useEffect, useState } from "react";
import Card from "./card";
import PageSelector from "./pageSelector";

export default function Results(props) {

  const [trimmedObjIDs, setTrimmedObjIds] = useState([])
  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    setTrimmedObjIds([...props.objectIDs.slice((props.resultsPerPage * pageIndex), (props.resultsPerPage * pageIndex) + props.resultsPerPage)])
  }, [pageIndex, props.objectIDs, props.resultsPerPage])

  return (
    <div id='results'>
      {trimmedObjIDs.map((object) => <Card id={object} /> )}
      <PageSelector passPageIndex={setPageIndex} pageCount={Math.ceil(props.objectIDs.length / props.resultsPerPage)}/>
    </div>
  )
}