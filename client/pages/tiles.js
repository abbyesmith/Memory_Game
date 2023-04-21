import { Router } from 'next/router'
import {useRouter} from 'next/navigation'
import { useState, useEffect } from "react";
import './_app.js'

export default function Tiles({ router,currUser }) {
    const [data, setData] = useState([]);
    const [checkedState, setCheckedState] = useState([]);
    
    console.log(currUser)
    
    useEffect(() => {
        fetch("http://127.0.0.1:5555/games", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
 
        })
    })

    useEffect(() => {
        // fetch the data from the tiles table (image and id)
        fetch("http://localhost:5555/tiles")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error(error));
    }, []);
    
    const handleOnChange = (id) => {
        // Changes if the button is clicked or not
        if (checkedState.includes(id)) {
            setCheckedState(checkedState.filter((item) => item !== id));
        } else {
            setCheckedState([...checkedState, id]);
        }
    };
    
    console.log(checkedState)
    
    const handleSaveCheckedItems = () => {
        // const router = useRouter();
    // Add the data to the Games table
    // Here for loop / map, console log each state ID, take this and put it in theh loop
    // Console logging

    checkedState.map((id) => {
        console.log(id)
        fetch("http://localhost:5555/games", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
    
          body: JSON.stringify({
            player_id: currUser.id,
            // pulling individual item of the checked state array
            tile_id: id,
          }),
        })
          .then((response) => response.json())
          .then((data) => console.log(data))
          .catch((error) => console.error(error));
    
        })
        router.push('/game')

  };

//   return (
//     <div>
//         <h1>Tile page</h1>
//         <h2>Select 8 images of Nicolas Cage</h2>
//       {data.map((item, index) => (
//         <div key={index}>
//           <img src={item.image_url} alt="" />
//           <input
//             type="checkbox"
//             checked={checkedState.includes(item.id)}
//             onChange={() => handleOnChange(item.id)}
//           />
//         </div>
//       ))}
      
//       <button onClick={handleSaveCheckedItems}>Save Checked Items</button>
//     </div>
//   );

return (
    <div className="tile-page">
      <h1 style={{color: "black"}}>Look at all these tiles!</h1>
      <h2 style={{color: "black"}}> Select 8 images of Nicolas Cage</h2>
      {data.map((image) => (
        <label key={image.id} htmlFor={image.id}>
          <  input type="checkbox" id={image.id} name="images" value={image.image_url} 
          onChange={() => handleOnChange(image.id)}/>
          checked={checkedState.includes(image.id)}
          <img src={image.image_url} className="tile-image" />
        </label>
      ))}
       <button onClick={handleSaveCheckedItems}>Save Checked Items</button>
    </div>
  
  );
  
  }


