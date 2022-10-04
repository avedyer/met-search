import { useEffect, useState } from "react"

export default function PageSelector(props) {

  const [pageIndex, setPageIndex] = useState(0)

  useEffect(() => {
    props.passPageIndex(pageIndex)
  }, [pageIndex])

  return (
    <div id='page-selector'>
      {Array.from(Array(props.pageCount).keys()).map(num => 
        <button onClick={() => setPageIndex(num)}>{num + 1}</button>
      )}
    </div>
  )
}