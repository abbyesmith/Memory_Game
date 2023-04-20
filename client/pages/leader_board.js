// import React, {useEffect,useState} from 'react'
// import { Router, useRouter } from 'next/router'


// export default function leader_board(){
//   const [data, setData] = useState([]);
//   const [sortBy, setSortBy] = useState('success_rate');
//   const [userData, setUserData] = useState({
//     username: "",
//     high_score: "",
//     id: "",
// });

//   const fetchUserData = (userData) => {
//     fetch ("http://127.0.0.1:5555/players",{
//         method: 'GET',
//         headers:{
//             "Content-Type": "application/json",
//         },
//     })
//     .then(r => r.json())
//     .then((data) => {
//         setUserData({
//             username: data.username,
//             high_score: data.high_score,
//             id: data.id
//         });
//     })
//     .catch((error) => console.error(error));
//   };

//   useEffect(() => {
//     fetch('/api/mydata')
//       // that api will change to the sql data
//       .then((response)=>response.json())
//       .then((data)=>setData(data));
//     }, [])

        
//     const toggleSortBy = () => {
//       if (sortBy === 'success_rate') {
//         setSortBy('total_win');
//       } else {
//         setSortBy('success_rate');
//       }
//     };

//     let sortedData = data;
//     if (sortBy === 'success_rate') {
//       sortedData = data.sort((a,b) => b.success_rate - a.success_rate);
//     } else {
//       sortedData = data.sort((a,b) => b.total_win - a.total_win);
//     }
    

//     return (
//       <div >
//         <h1>Leader Board</h1>
//         <img src="https://as2.ftcdn.net/v2/jpg/01/28/18/39/1000_F_128183998_KtJNAdftX7DVWE0k0sryIdszVjUmFQBQ.jpg" width = "200"/>
//         <button onClick = {toggleSortBy}>
//           Sort by {sortBy === 'success_rate' ? 'Total Wins' : 'Success Rate'}
//         </button>
//         <table >
//           <thead>
//             <tr>
//               <th></th>
//               <th>Player</th>
//               <th>Games Won</th>
//               <th>Success Rate</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>IMAGE</td>
//               <td>UserTest</td>
//               <td>7 wins</td>
//               <td>72%</td>
//             </tr>
//             {data.map((item)=>(
//               success_rate = item.total_wins / item.total_games * 100,
//               <tr key = {item.id}>
//                 <td>{item.image}</td>
//                 <td>{item.username}</td>
//                 <td>{item.total_wins} wins</td>
//                 <td>{success_rate}%</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//       </div>
    
//     )
// }

import React, { useEffect, useState } from 'react';

export default function leader_board() {
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState('success_rate');

  useEffect(() => {
    fetch('http://127.0.0.1:5555/players')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  const toggleSortBy = () => {
    if (sortBy === 'score') {
      setSortBy('username');
    } else {
      setSortBy('username');
    }
  };

  let sortedData = [...data];
  if (sortBy === 'score') {
    sortedData = data.sort((a, b) => b.high_score - a.high_score);
  } else {
    sortedData = data.sort((a, b) => a.username - b.username);
  }

  return (
    <div>
      <h1>Leader Board</h1>
      <img src="https://as2.ftcdn.net/v2/jpg/01/28/18/39/1000_F_128183998_KtJNAdftX7DVWE0k0sryIdszVjUmFQBQ.jpg" width="200" />
      <button onClick={toggleSortBy}>Sort by {sortBy === 'high_score' ? 'Username' : 'Best Score'}</button>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Player</th>
            <th>Games Won</th>
            <th>Success Rate</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.image}</td>
              <td>{item.username}</td>
              <td>{item.total_wins} wins</td>
              <td>{((item.total_wins / item.total_games) * 100).toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}