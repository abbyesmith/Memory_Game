import {useEffect,useState} from 'react'
import { Router, useRouter } from 'next/router'
import './_app.js'

export default function tiles() {
    const [data, setData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/tiles')
          .then((response) => response.json())
          .then((data) => setData(data))
          .catch((error) => console.error(error));
          console.log(data)
      }, []);


        const [checkedState, setCheckedState] = useState(
            new Array (data.length).fill(false)
        );
    
        const handleOnChange = (position) => {
            const updatedCheckedState = checkedState.map((item, index) =>
                index === position ? item : item);
            setCheckedState(updatedCheckedState)
        }

        return (
            <div className="tile-page">
              <h1>Look at all these tiles!</h1>
              <p>IT'S NICOLAS CAGE!!!</p>
              {data.map((image) => (
                <label key={image.id} htmlFor={image.id}>
                  <input type="checkbox" id={image.id} name="images" value={image.image_url} />
                  <img src={image.image_url} className="tile-image" />
                </label>
              ))}
            </div>
          );

              }