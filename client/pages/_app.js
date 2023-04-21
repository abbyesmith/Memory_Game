import '@/styles/globals.css'
import {useEffect, useState} from 'react'
import { Router, useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const [currUser, setCurrUser] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);
  const router = useRouter();

  useEffect(()=>{
    fetch('/logged_user')
    .then(r=>r.json())
    .then(data=>setCurrUser(data))
  }, [])


  return <Component {...pageProps} router={router} currUser = {currUser} setCurrUser = {setCurrUser} setloggedIn={setloggedIn} test= {"test"}/>
}
