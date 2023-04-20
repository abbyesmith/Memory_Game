import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'

export default function signup({currUser,loggedIn,setcurrUser,setloggedIn}) {
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [userImage, setUserImage] = useState("");
    const router = useRouter()
    function handleSubmit(e) {
        e.preventDefault();
        const data = {
            "username": username,
            "password": password,
            "image_url": userImage,
        }

        fetch ("http://127.0.0.1:5555/signup",{
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
        .then(()=> router.push('/login'))
    }

    return(
        <div>
            <h1>New User Sign Up</h1>
            <form onSubmit = {handleSubmit}>
                <p>Username</p>
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
                <p>User Image</p>
                <input 
                    type="text" 
                    value={userImage} 
                    onChange = {(e)=>setUserImage(e.target.value)} 
                />
                <p></p>
                <button type="submit">Register</button>
            </form>
        </div>
    )

}