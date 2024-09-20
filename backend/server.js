import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import env from "dotenv";

const port = 4000;
const app = express();
env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("../frontend/public"));

app.get("/api/image", async (req, res) => {
    const googleKey = process.env.GOOGLE_API_KEY;
    const cx = process.env.SEARCH_ENGINE_ID;
    const nbaKey = process.env.NBA_API_KEY;
    const player = req.query.playerName;
    const imgSearch = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(`${player} playing basketball`)}&cx=${cx}&key=${googleKey}&searchType=image`;

    try {
        const response = await axios.get(imgSearch);
        const data = response.data;
        const imgURL = data.items[0].link;
        if (data.items && data.items.length > 0) {
            res.json({image: imgURL});
        } else {
            console.log("Backend error");
        }
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});