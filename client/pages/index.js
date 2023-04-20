import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <h1>Memory Front End starting page</h1>
      <p></p>
      <Link href="/login">Existing User</Link>
      <p>New User</p>
      <img src="https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg?cs=srgb&dl=pexels-anna-shvets-4587955.jpg&fm=jpg" width = "400" />
    </div>
  )
}









// return <Link href="/login"> Please Log in </Link>
