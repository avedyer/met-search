import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Card(props) {

  let navigate = useNavigate()

  const [objData, setObjData] = useState()

  useEffect(() => {
    if (!objData || props.id !== objData.id) {
      fetchObjData().then(result => parseObjData(result))
    }
  }, [objData])

  async function fetchObjData() {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + props.id

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      return data
    }

    catch (err) {
      return false
    }
  } 

  function parseObjData(rawData) {
    let parsedData = {}

    let requiredStrings = ['artistDisplayName', 'title', 'objectDate', 'medium']

    requiredStrings.forEach(key => {
      parsedData[key] = rawData[key].length > 64 ? rawData[key].substring(0, 61) + '...' : rawData[key]
    })

    parsedData.primaryImage = rawData.primaryImageSmall.length > 0 ? rawData.primaryImageSmall : rawData.primaryImage

    setObjData(parsedData)
  }

  return(

    typeof objData === 'undefined' || objData === null ?

      //loading placeholder

      <div className='card loading' key={props.id}>loading object {props.id}...</div>

    :

      //object card

      <div className='card' key={props.id} onClick={() => navigate(`/object/${props.id}`)}>
        <div className='main-image'>
          <img src={objData.primaryImage}/>
        </div>
        <div className='info'>
          <span className='artist'>{objData.artistDisplayName}</span>
          <div className='artist-and-date'>
            <span className='title'>{objData.title}, </span>
            <span className='date'>{objData.objectDate}</span>
          </div>
          <span className='medium'>{objData.medium}</span>
        </div>
      </div>
  )
}