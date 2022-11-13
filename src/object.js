import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Object(props) {

  const [objData, setObjData] = useState()

  useEffect(() => {
    if (!objData) {
      fetchObjData()
    }
  }, [objData])

  async function fetchObjData() {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + props.id

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      setObjData(data)
    }

    catch (err) {
      return false
    }
  }

  return(
    <div>
      {props.id}
    </div>
  )
  
}