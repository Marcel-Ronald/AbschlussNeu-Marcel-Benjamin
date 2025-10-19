import express from "express"
import cors from "cors"

const app = express()
const PORT = 3001

// Cors Sicherheit im Browser ausschalten
app.use(cors())

// Server kann JSON lesen
app.use( express.json() )


// APIs definieren
app.get("/",(req,res) => {
  // Hier Logik die laufen soll, wenn Route aufgerufen wird   
  console.log("Hallo ich bin im Backend");
  
  // Antwort zurückschicken
  res.send("Willkommen")
})




app.listen(PORT, ()=>{
    console.log("Server gestartet auf Port " + PORT);
})