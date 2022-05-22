import { useState } from "react";
import { useNavigate } from "react-router-dom"
import "../CSS/page.css";
import "../CSS/Pages/newline.css";


export default function CreateNewLine(){
    //States
    const [line, setLine] = useState("")
    const [name, setName] = useState("")
    const [valid, setValid] = useState(true)

    const navigate = useNavigate();

    const banned = ["chink", "fagg", "nigg"]

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLineChange = (e) => {
        setLine(e.target.value)
    }

    const createNewLine = () => {
        if (name !== "" && line !== "" && line.toLowerCase().includes(name.toLowerCase()) && !(line.toLowerCase().includes(banned[0]) || line.toLowerCase().includes(banned[1]) || line.toLowerCase().includes(banned[2]))){
            fetch('http://localhost:5000/new-pickup-line', {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({line, name})})
            .then((res)=>{
                if (res.ok){ 
                    navigate("/")
                    console.log("added new line: ", line)
                 }
                 else{
                     setValid(false)
                     console.log("Invalid line:", line)
                 }
                })
                .catch((error)=>{console.log("error: ",error)})
        }
        else{
            setValid(false)
            console.log("Invalid line: ", line)
        }
    }
    return(
    <div className="pickup--page--container">
        <div className="new--line--content">
            <div className="new--line--container">
                <p className="new--line--header">Create Pickup Line</p>
                <input className="new--line--input input--space" id="user-input" placeholder="Enter a name here" onChange={(e)=>handleNameChange(e)}/>  
                <input className="new--line--input" id="user-input" placeholder="Enter line here" onChange={(e)=>handleLineChange(e)}/>
                {!valid ? <p className="create--valid--line">The attempted pickup line could not be added. Enter a new line.</p> : <div className="input--space"/>}  
                <button className="new--line--button" onClick={createNewLine}>Create Line</button>
            </div>
        </div>
        <div className="footer">
            <p className="footer--text">Proudly made by Brandon Lu :)</p>
        </div>
    </div>)
}