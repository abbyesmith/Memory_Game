import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

// const inter = Inter({ subsets: ['latin'] })
//  function Home() {
//   return (
//     <div className="home-page">
//       <h1>Memory Front End starting page</h1>
//       <p></p>
//       <Link href="/login">Existing User</Link>
//       <Link href="/signup">New User</Link>
//       <img src="https://images.pexels.com/photos/4587955/pexels-photo-4587955.jpeg?cs=srgb&dl=pexels-anna-shvets-4587955.jpg&fm=jpg" width = "400" />
//     </div>
//   )
// }



// export default Home




function Navigation() {
  return (
    <nav>
      <ul className='nav-links'>
        <li><Link href ="/">Home</Link></li>
        <li><Link href ="/login">Existing User</Link></li>
        <li><Link href ="/signup">New User</Link></li>
      </ul>
    </nav>
  );
}

 


export default Navigation;



