import { useState, useEffect } from "react";
import styles from '../styles/game.module.css'
import Link from 'next/link'



// const [boardData, setBoardData] = useState([])



export default function game({currUser, userData}) {
  const [boardData, setBoardData] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  //   Abby (and GPT) came up with the get function
  //   const [userData, setUserData] = useState({
    //     username: "",
    //     high_score: "",
    //     id: "",
    //   });
    if(!currUser){
      return <div>Loading</div>
    }
    const board = ["🤖", "👽", "👻", "🤡", "🐧", "🦚", "😄", "🚀"];

    
    useEffect(() => {
      initialize();
      fetchUserData(currUser);
    }, []);
    
    console.log(currUser)
    
    const fetchImages = () => {
      fetch (`http://127.0.0.1:5555//highscore/games`, {
        method: "GET",
        headers: {"Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then ((boardData) => {
      setBoardData({
        image: boardData.image_url,
      });
    })
  }
  const newBoard = []
  const fetchUserData = (currUser) =>{
    fetch (`http://127.0.0.1:5555//highscore/${currUser.id}`,{
      
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(r => r.json())
    .then((data) => {
      setUserData({
        username: data.username,
        high_score: data.high_score,
        id: data.id
      });
    })
    .catch((error) => console.error(error));
  };
  // This patch is not working :(
    const handleSubmitHighScore = () => {
      // e.preventDefault();
      const data = {
        "high_score": moves
      }
      
      fetch (`http://127.0.0.1:5555//highscore/${currUser.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })
      .then(r=>r.json())
      .catch((error)=>console.error(error))
      
      alert('New Score successfully updated')
    }
    
    useEffect(() => {
      if (matchedCards.length == 16) {
        setGameOver(true);
      }
    }, [moves]);
    
    const initialize = () => {
    shuffle();
    setGameOver(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
  };
  const shuffle = () => {
    const shuffledCards = [...board, ...board]
      .sort(() => Math.random() - 0.5)
      .map((v) => v);

    setBoardData(shuffledCards);
  };

  const updateActiveCards = (i) => {
    if (!flippedCards.includes(i)) {
      if (flippedCards.length == 1) {
        const firstIdx = flippedCards[0];
        const secondIdx = i;
        if (boardData[firstIdx] == boardData[secondIdx]) {
          setMatchedCards((prev) => [...prev, firstIdx, secondIdx]);
        }

        setFlippedCards([...flippedCards, i]);
      } else if (flippedCards.length == 2) {
        setFlippedCards([i]);
      } else {
        setFlippedCards([...flippedCards, i]);
      }

      setMoves((v) => v + 1);
    }
  };



  return (
    <div className={styles.container}>
        <div >
            {currUser.high_score ? (
                <p>{`Welcome ${currUser.username}! Your current high score is ${currUser.high_score}`}</p>
            ) : (
                <p>
                {`Welcome ${currUser.username}! To play the game, click two cards to reveal the image. If the two cards match, then they will stay face up. If they do not match, they will flip back over. Continue until all of the cards are face up.`}
                </p>
            )}
        <br/>
        <p>{`Moves - ${moves}`}</p>
      </div>

      <div className={styles.board}>
        {boardData.map((data, i) => {
          const flipped = flippedCards.includes(i) ? true : false;
          const matched = matchedCards.includes(i) ? true : false;
          return (
            <div
              onClick={() => {
                updateActiveCards(i);
              }}
              key={i}
            //   className={`card ${flipped || matched ? "active" : ""} ${
            //     matched ? "matched" : ""
            //   } ${gameOver ? "gameover" : ""}`}
            //   I don't know how to do the classname here
            >
              <div className={styles.card_front}>{data}</div>
              <div className={styles.card_back}></div>
            </div>
          );
        })}
      </div>
      <div className={styles.menu}>
        <p>{`GameOver - ${gameOver}`}</p>
          {gameOver  ? 
            <button onClick={() => handleSubmitHighScore()}>
                Submit New Best Score!
            </button>
            : <p></p>}
        <button onClick={() => initialize()} className={styles.reset_btn}>
          Reset
        </button>
        <Link href = "/leader_board">Go To Leader Board</Link>
      </div>
      <img src = "https://pbs.twimg.com/media/EfkuwuFWAAI4Ih_.jpg"/>
    </div>
  );
}
// export default function game() {

//     return(
//         <div>
//             <h1>Game page</h1>
//             <img src="https://i.chzbgr.com/full/8496134144/hE66DDB11/rare-photograph-of-me" height = "100px"/>
            
//         </div>
//     )
// }
