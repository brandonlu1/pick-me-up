import { useEffect, useState } from "react";
import LineCard from "../Components/LineCard";
import "../CSS/page.css";

export default function PickMeUp(){
    //States
    const [searched, setSearched] = useState(false);
    const [name, setName] = useState("");

    //Handles user input change
    const handleChange = (e) => {
        setName(e.target.value)
    }
    //Handles user input entry
    const handleEnter = (e) => {
        if (e.key === "Enter" && name != ""){
            setSearched(true)
            console.log(name)
        }
    }

    return(
    <div className="pickup--page--container">
        <div className="pickup--content">
            <div className="pickup--box--container">
                <p className="pickup--header">Pick Me Up</p>
                <input className="pickup--input" id="user-input" onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleEnter(e)}/>  
            </div>
            {searched ? 
            <div>
            <p className="pickup--results--text">Results</p>
            <LineCard line="Louren Ipsum Louren Ipsum Louren Ipsum Louren Ipsum Louren Ipsum Louren Ipsum"/>
            <LineCard line="Louren Ipsum Louren Ipsum Louren Ipsum Louren Ipsum"/>
            <LineCard line="Louren Ipsum Louren Ipsum Louren Ipsum"/>
            <LineCard line="Louren Ipsum Louren Ipsum Louren Ipsum Louren Ipsum Louren Ipsum"/>
            <LineCard line="Louren Ipsum Louren Ipsum"/>
            <LineCard line="Louren Ipsum Louren Ipsum Louren Ipsum"/>
            </div> : <div/>}
        </div>
    </div>)
}