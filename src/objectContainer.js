import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import SimpleForm from "./simpleForm";
import Object from './object'

export default function ObjectContainer() {

  let { id } = useParams();

  return(
    <div>
      <SimpleForm />
      <Object id={id}/>
    </div>
  )
  
}