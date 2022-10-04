import { useEffect, useState } from "react";
import Card from "./card";

export default function Results(props) {


  return (
    <div id='results'>
      {props.objectIDs.map(object => <Card id={object} /> )}
    </div>
  )
}