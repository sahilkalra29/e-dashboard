import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const Signup=() =>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })

    const collectData = async () => {
        try {
            let result = await fetch('http://localhost:2907/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });
            if (result){
                navigate('/');
            }
            if (!result.ok) {
                throw new Error('Network response was not ok');
            }
            result = await result.json();
            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token", JSON.stringify(result.auth));
            console.warn(result);
        } catch (error) {
            setError(error.message);
            console.error('Error:', error);
        }
    }

    return(
        <div className="register">
            <h1>Register</h1>
            <input className="inputBox" type="text" 
            value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Name" />

            <input className="inputBox" 
            value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Enter Email" />
            
            <input className="inputBox" 
            value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter Password" />
            
            <button onClick={collectData} className="appButton" type="button">Sign Up</button>
        </div>
    )
}

export default Signup;