import { useState } from "react";
import LineCard from "../Components/LineCard";
import "../CSS/page.css";

export default function PickMeUp(){
    //States
    const [searched, setSearched] = useState(false);
    const [name, setName] = useState("");
    const [lastSearch, setLastSearch] = useState("")
    const [results, setResult] = useState([])

    //Handles user input change
    const handleChange = (e) => {
        setName(e.target.value)
    }
    //Handles user input entry
    const handleEnter = (e) => {
        if (e.key === "Enter" && name !== "" && name != lastSearch){
            setSearched(true)
            setLastSearch(name)
            fetch('http://localhost:5000/get-pickup-lines', {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({name})})
            .then(res => res.json())
            .then((res)=>{
                if (res !== null){
                    setResult(res)
                }
                else{
                    console.log("Could not find results")
                }
        })
            .catch((error)=>{console.log("error: ",error)})
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
            {results.map(line => <LineCard line={line.line}/>)}
            </div> : <div/>}
        </div>
    </div>)
}