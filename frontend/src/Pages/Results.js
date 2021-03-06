import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import LineCard from "../Components/LineCard";
import "../CSS/page.css";
import "../CSS/Pages/results.css";

export default function Results(props){
    //States
    const [name, setName] = useState("");
    const [lastSearch, setLastSearch] = useState("")
    const [results, setResult] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        let name = window.location.href.split("/")[3]
        console.log("name: ", typeof id)
        setName(name)
        fetch('http://localhost:5000/get-pickup-lines', {
            method: "PUT",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({name})})
        .then(res => res.json())
        .then(response=>{
            console.log("response: ", response)
            if (response.length > 0){ 
                setResult(response)
             }
            else{ 
                setResult([])
             }
    })
        .catch((error)=>{console.log("error: ",error)})
    },[])

    //Handles user input change
    const handleChange = (e) => {
        setName(e.target.value)
    }
    //Handles user input entry
    const handleEnter = (e) => {
        if (e.key === "Enter" && name !== "" && name !== lastSearch){
                navigate(`/${name}`)
            setLastSearch(name)
            fetch('http://localhost:5000/get-pickup-lines', {
                method: "PUT",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({name})})
            .then(res => res.json())
            .then((response)=>{
                navigate(`/${name}`)
                console.log("response: ", response)
                if (response.length > 0){ 
                    setResult(response)
                 }
                else{ 
                    setResult([])
                 }
        })
            .catch((error)=>{console.log("error: ",error)})
        }
    }

    return(
    <div className="results--page--container">
        <div className="results--nav">
        <p className="results--header">Qoogle</p>
        <input className="results--input" id="user-input" placeholder="Search a name" onChange={(e)=>handleChange(e)} onKeyDown={(e)=>handleEnter(e)}/>  
        </div>
        <div className="result--content">
            <div className="showing--results">
                <p className="showing--results--text">Showing results for&nbsp;</p>
                <p className="showing--results--results">{name}</p>
            </div>
            {/**Maps pickup line cards */}
            {results.length > 0 ? results.map(line => <LineCard key={line.line} line={line.line} name={line.name} rating={line.rating}/>) : <p className="notFound--text">Cannot find any results :(</p>}
        </div>
    </div>
    )
}