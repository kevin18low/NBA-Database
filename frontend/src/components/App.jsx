import React, {useState, useEffect} from "react";
import axios from "axios";

function App() {
    const [img, setImg] = useState(null);

    useEffect(() => {
        const getImageData = async () => {
            const name = "Lebron"
            try {
                const response = await axios(`/api/image?playerName=${encodeURIComponent(name)}`);
                const data = response.data;
                setImg(data.image);
            } catch (error) {
                console.log("Frontend error");
            }              
        }
        getImageData();
    });

    return <div>
        <img src={img} alt="basketball player"></img>
    </div>;
}

export default App;
