import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Card(props) {

  let navigate = useNavigate()

  const [objData, setObjData] = useState()

  useEffect(() => {
    fetchObjData().then(result => setObjData(result))
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

  if (typeof objData === 'undefined' || objData === null ) {
    return (
      <div className='card loading' key={props.id}>loading object {props.id}...</div>
    )
  }

  else {
    return (
      <div className='card' key={props.id} onClick={() => navigate(`/object/${props.id}`)}>
        <div className='main-image'>
          <img src={objData.primaryImageSmall}/>
        </div>
        <div className='info'>
          <span className='title'>{objData.title}</span>
          <div className='artist-and-date'>
            <span className='artist'>{objData.artistDisplayName}</span>
            <span className='date'>{objData.objectDate}</span>
          </div>
          <span className='medium'>{objData.medium}</span>
        </div>
      </div>
    )
  }
}