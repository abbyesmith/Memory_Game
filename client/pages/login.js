// import { Formik, Form, Field, ErrorMessage } from "formik";
import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'

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
        <div>
            <h1>Login</h1>
            <form onSubmit = {handleSubmit}>
                <p>Username</p>
                <p>keep typing in the input. the text is white</p>
                <input 
                    type="text" 
                    value={username} 
                    onChange = {(e)=>setUsername(e.target.value)} 
                />
                <p>Password</p>
                <input 
                    type="text" 
                    value={password} 
                    onChange = {(e)=>setPassword(e.target.value)} 
                />
                <p></p>
                <button type="submit">Login</button>
            </form>
        </div>
    )

}