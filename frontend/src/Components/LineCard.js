import "../CSS/Components/linecard.css"

export default function LineCard(props){
    return(
    <div className="linecard--container">
        <p className="linecard--line">{props.line}</p>
    </div>)
}