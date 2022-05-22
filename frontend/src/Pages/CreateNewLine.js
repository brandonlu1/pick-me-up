import { useState } from "react";
import "../CSS/page.css";
import "../CSS/Pages/newline.css"

export default function CreateNewLine(){
    //States
    const [line, setLine] = useState("")
    const [name, setName] = useState("")
    const [valid, setValid] = useState(true)

    const banned = ["chink", "fagg", "nigg"]

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleLineChange = (e) => {
        setLine(e.target.value)
    }

    const createNewLine = () => {
        console.log("HELLO")
        console.log(line)
        if (name !== "" && line !== "" && line.includes(name) && !(line.includes(banned[0]) || line.includes(banned[1]) || line.includes(banned[2]))){
            fetch('http://localhost:5000/new-pickup-line', {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify({line, name})})
            .then(res => res.json())
            .then((res)=>{
                console.log(res)
                if (res.status === 200){ 
                    setName("")
                    setValid(true)
                    setLine("")
                 }
                 if (res.status === 409){
                     setValid(false)
                 }
                })
        }
        else{
            console.log("invalid")
            setValid(false)
        }
        console.log("DONE")
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