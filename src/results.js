import { useEffect, useState } from "react";
import Card from "./card";

export default function Results(props) {

  const [cardCount, setCardCount] = useState(20)
  const [pageIndex, setPageIndex] = useState(0)
  const [pieceList, setPieceList] = useState([])

  console.log(props.results)

  useEffect(() => {
    console.log(pieceList)
    if (pieceList.length < cardCount && pieceList.length < props.results.length) {
      let newArr = [...pieceList]
      newArr.push(props.results[(pageIndex * cardCount) + pieceList.length])
      setPieceList([...newArr])
    }
  }, [pieceList, props.results])

  useEffect(() => {
    setPieceList([])
  }, [props.results])

  return (
    <div id='results'>
      {pieceList.map(piece => <Card id={piece} /> )}
    </div>
  )
}