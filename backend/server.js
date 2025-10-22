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

// zentraler Error Handler
app.use( (err, req, res, next) => {
  const status = err.status || 500;

  // Meldung die an Frontend zurückgeschickt wird
  const payload = {
    error: true,
    message: err.message || "Internal Server Error"
  }

  res.status(status).send(payload)

} )


app.listen(PORT, ()=>{
    console.log("Server gestartet auf Port " + PORT);
})