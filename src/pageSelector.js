import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PageSelector(props) {

  const navigate = useNavigate();

  return (
    <div id='page-selector'>
      {Array.from(Array(props.pageCount).keys()).map(num => 
        <button onClick={() => props.passPageIndex(num)}>{num + 1}</button>
      )}
    </div>
  )
}