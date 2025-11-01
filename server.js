//Hämtar in installerade paket och lägger in i variabler
const express = require("express");
const cors = require("cors");
const env = require("dotenv").config();
const mongoose = require("mongoose");


//Skapar en app med express
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
//App kan hantera korsförfrågningar
app.use(cors());
//All inkommande data blir till json
app.use(express.json());

//Ansluter till MongoDB
mongoose.connect(process.env.DATABASE).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.log("Error connecting to database: " + error);
});

//Quiz Schema
const QuizSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Du måste skicka med användarnamn!"]
    },
    score: {
        type: String,
        required: [true, "Du måste skicka med resultat!"]
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Quiz = mongoose.model("Quiz", QuizSchema);

//Routes
app.get("/", async(req, res) => {
    res.json({message: "Welcome to this quiz-API"});
});

app.get("/results", async(req, res) =>{
    try{
        //Tar ut allt från alla jobb
        let result = await Quiz.find({});

        return res.json(result);
    }catch(error){
        //Fel på serversidan
        return res.status(500).json(error);
    }
});
//Lägger till resultat
app.post("/results", async(req, res) => {
    try{
        let result = await Quiz.create(req.body);

        res.json(result);
    }catch(error){
        //Klientfel
        return res.status(400).json(error);
    }
});
//Ändrar resultat
app.put("/results/:id", async(req, res) => {
    try{
        //Uppdatera
        const updatedResult = await Quiz.findByIdAndUpdate(req.params.id, req.body, {new: true});
        //Skriv ut meddelande
        res.json({ message: "Resultat uppdaterad: " + updatedResult.username });
    } catch(error){
        //Serverfel
        return res.status(500).json(error);
    }
})
//Raderar resultat
app.delete("/results/:id", async(req, res) => {
    try{
        const deleteRes = await Quiz.findByIdAndDelete(req.params.id);
        res.json({message: "Quiz-result deleted: " + req.params.id});
    }catch(error){
        res.status(500).json(error);
    }
});

app.listen(port, () => {
    console.log("Server is running on port: " + port);
});
