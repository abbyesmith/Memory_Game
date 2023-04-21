// import { Formik, Form, Field, ErrorMessage } from "formik";
import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import './_app.js'
import Link from 'next/link'


export default function login({currUser,loggedIn,setcurrUser,setloggedIn}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter()
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            "username": username,
            "password": password
        }

        fetch ("http://127.0.0.1:5555/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(r => r.json())
        .then(user => {
            console.log(user)
            setloggedIn(true)
        })
        .then(()=> router.push('/game'))
    }

    return(
        <div className="login-box">
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
                <p style={{color: "black"}}>Username</p>
                <input 
                    type="text" 
                    value={username} 
                    onChange = {(e)=>setUsername(e.target.value)}
                    style={{color: "black"}} 
                />
                <p style={{color: "black"}}>Password</p>
                <input 
                    type="password" 
                    value={password} 
                    onChange = {(e)=>setPassword(e.target.value)}
                    style={{color: "black"}} 
                />
                <p></p>
                <button style={{color: "black"}} type="submit">Login</button>
            </form>
        </div>
    )

}