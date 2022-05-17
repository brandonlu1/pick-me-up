import { useState } from "react";
import LineCard from "../Components/LineCard";
import "../CSS/page.css";

export default function PickMeUp(){
    //States
    const [searched, setSearched] = useState(false);
    const [name, setName] = useState("");
    const [lastSearch, setLastSearch] = useState("")
    const [results, setResult] = useState([])
    const [resultsTitle, setResultsTitle] = useState("Results")

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
                console.log(res)
                if (res.length > 0){ 
                    setResult(res)
                    setResultsTitle("Results")
                 }
                else{ 
                    console.log("HELLO")
                    setResultsTitle("Could not find anything :(")
                    setResult([])
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
            <p className="pickup--results--text">{resultsTitle}</p>
             {/**Maps pickup line cards */}
            {results.map(line => <LineCard line={line.line}/>)}
            </div> : <div/>}
        </div>
    </div>)
}