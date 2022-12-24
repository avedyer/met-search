import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Object(props) {

  const [objData, setObjData] = useState()
  const [location, setLocation] = useState()
  const [popout, setPopout] = useState(false)
  const [zoomedImage, setZoomedImage] = useState(false)
  const [objectInfoDisplayed, setObjectInfoDisplayed] = useState(false)
  const [artistInfoDisplayed, setArtistInfoDisplayed] = useState(false)

  useEffect(() => {
    if (!objData) {
      fetchObjData()
    }
    else {
      if (!location) {
        chooseLocation()
      }
    }
  }, [objData])

  async function fetchObjData() {

    let url = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/' + props.id;

    try {
      const response = await fetch(url, {mode: 'cors'});
      const data = await response.json();
      setObjData(data)
    }

    catch (err) {
      return false
    }
  }

  function chooseLocation() {
    let possibleLocations = [objData.city, objData.state, objData.county, objData.country, objData.culture]
    for (let i=0; i<possibleLocations.length; ++i) {
      if (possibleLocations[i]) {
        setLocation(possibleLocations[i])
        break
      }
    }
  }

  if (objData) {
    return(
      <div id="object">
        <div id="frame">
          <img id="primary-image" onClick={() => setPopout(true)} src={objData.primaryImage} />
        </div>
        <div id="info">
          <div id='object-info'>
            <span>{objData.title}</span>
            <button 
              className="display-toggle"
              onClick={() => setObjectInfoDisplayed(!objectInfoDisplayed)}>
              {objectInfoDisplayed ? '-' : '+'}
            </button>
            <div className={`full-info ${objectInfoDisplayed ? '' : 'hidden'}`}>
              <span>{objData.objectDate}</span>
              <span>{objData.dimensions}</span>
              <span>{location}</span>
            </div>
          </div>
          <div id='artist-info'>
            <div className='topline'>
              <span>{objData.artistDisplayName ? objData.artistDisplayName : 'Artist unknown'}</span>
              <button 
                className={`display-toggle ${objData.artistDisplayName ? '' : 'hidden'}`} 
                onClick={() => setArtistInfoDisplayed(!artistInfoDisplayed)}>
                {artistInfoDisplayed ? '-' : '+'}
              </button>
            </div>
            <div className={`full-info ${artistInfoDisplayed ? '' : 'hidden'}`}>
              <span>{objData.artistBeginDate}-{objData.artistEndDate}, {objData.artistNationality}</span>
              <span>{objData.artistPrefix + `${objData.artistPrefix ? ' ' : ''}`}{objData.artistRole}</span>
            </div>
          </div>
          <span id='medium'>{objData.medium}</span>
        </div>
        {
          popout ?
          <div id='popout' onClick={() => setPopout(false)}>
            <img 
              onClick={(e) => {
                setZoomedImage(!zoomedImage)
                e.stopPropagation()
              }} 
              className={zoomedImage ? '' : 'contained'} 
              src={objData.primaryImage}/>
          </div>
          :
          ''
        }
      </div>
    )
  }

  else {
    return (
      <div id="object">
        <h1>loading...</h1>
      </div>
    )
  }
  
}