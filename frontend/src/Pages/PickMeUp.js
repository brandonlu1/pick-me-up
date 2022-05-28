import { useState } from "react";
import { useNavigate } from "react-router-dom"
import OptionButton from "../Components/OptionButton";
import "../CSS/page.css";

export default function PickMeUp(){
    const [name, setName] = useState()

    const navigate = useNavigate();

    //Handles user input change
    const handleChange = (e) => {
        setName(e.target.value)
    }
    //Handles user input entry
    const handleEnter = (e) => {
        if (e.key === "Enter"){
                navigate(`/${name}`)
        }
    }

    return(
    <div className="pickup--page--container">
        <div className="pickup--content">
            <p className="pickup--header">Qoogle</p>
            <input className="pickup--input" id="user-input" placeholder="Search a name" onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleEnter(e)}/>  
            <div className="pickup--line--options">
                <OptionButton text="Create Line" to="/create-new-pickup-line"/>
                <OptionButton text="Search by Word"/>
            </div>
        </div>
        <div className="footer">
            <p className="footer--text">Proudly made by Brandon Lu :)</p>
        </div>
    </div>)
}