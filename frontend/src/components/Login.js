import React ,{useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/")
        }
    })

    const handleLogin = async () => {
        let result = await fetch('http://localhost:2907/login',{
            method: 'post',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' },
        })
        result = await result.json();
        console.warn(result);
        if(result.name){
            localStorage.setItem("user", JSON.stringify(result))
            navigate("/")
        }
        else{
            alert("Incorrect Login Details");
        }
    }

    return(
        <div className="login">
            <input className="inputBox" type="text"  placeholder="Enter Email" 
            onChange={(e)=>setEmail(e.target.value)} value={email}/>

            <input className="inputBox" type="password" placeholder="enter password" 
            onChange={(e)=>setPassword(e.target.value)} value={password}/>

            <button onClick={handleLogin} className="appButton" type="button">Login</button>
        </div>
    )
}


export default Login;