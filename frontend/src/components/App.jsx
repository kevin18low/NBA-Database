import React, {useState, useEffect} from "react";
import axios from "axios";

function App() {
    const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
    const [img, setImg] = useState(defaultImg);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState(false);

    useEffect(() => {
        if (search) {
            const getImageData = async () => {
                const name = input;
                try {
                    const response = await axios(`/api/image?playerName=${encodeURIComponent(name)}`);
                    const data = response.data;
                    setImg(data.image);
                } catch (error) {
                    console.log("Frontend error");
                }              
            }
            getImageData();
            setSearch(false);
        }        
    }, [search, input]);

    function handleChange(event) {
        setInput(event.target.value);
    }

    function handleClick() {
        setSearch(true);
    }

    return <div>
        <img src={img} alt="basketball player"></img>
        <input type="text" placeholder="Type here" onChange={handleChange}/>
        <button onClick={handleClick}>Search</button>
        <h3>{input}</h3>
    </div>;
}

export default App;
