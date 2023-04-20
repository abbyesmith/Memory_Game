import '@/styles/globals.css'
import {useEffect, useState} from 'react'

export default function App({ Component, pageProps }) {
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);


  useEffect(()=>{
    fetch('/logged_user')
    .then(r=>r.json())
    .then(data=>setcurrUser(data))
  }, [])


  return <Component {...pageProps} currUser = {currUser} setCurrUser = {setCurrUser} setloggedIn={setloggedIn} test= {"test"}/>
}
