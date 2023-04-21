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
      setSortBy('high_score');
    }
    if (sortBy === 'username') {
        setSortBy('high_score');
      } else {
        setSortBy('username');
      }
  };


  let sortedData = [...data];

        if (sortBy === 'high_score') {
        sortedData = sortedData.filter(
            item => item.high_score !== null).sort((a, b) => b.high_score - a.high_score);
        } else {
        sortedData = sortedData.filter(
            item => item.high_score !== null).sort((a, b) => a.username.localeCompare(b.username));
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
            <th>Best Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.image}</td>
              <td>{item.username}</td>
              <td>{item.high_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}