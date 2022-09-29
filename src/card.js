export default function Card(props) {
  return (
    <div className='card' key={props.id}>{props.id}</div>
  )
}