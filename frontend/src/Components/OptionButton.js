import "../CSS/Components/optionButton.css"
import { useNavigate } from "react-router-dom"

export default function OptionButton(props){
    const navigate = useNavigate();
    return(
        <button className="line--option--button" onClick={()=>navigate(props.to)}>
            <p className="line--option--text">{props.text}</p>
        </button>
)
}