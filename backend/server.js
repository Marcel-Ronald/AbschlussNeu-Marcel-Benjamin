
import express, { response } from "express"
import cors from "cors"
import { PrismaClient } from "@prisma/client"
//import { userLogin } from "./controller/userController.js"

// BigInt JSON serialization fix
BigInt.prototype.toJSON = function() {
  return this.toString();
};

const prisma = new PrismaClient()

const app = express()
const PORT = 3001

// Cors Sicherheit im Browser ausschalten
app.use(cors())

// Server kann JSON lesen
app.use( express.json() )


// APIs definieren
// get all sharks
app.get("/sharks/all", async (req,res) => {
  const sharks = await prisma.shark.findMany()
  res.send(sharks)
})

// search sharks by name
app.get("/sharks", async (req,res) => {
  console.log(req.query) 
  if (!req.query.searchterm) return res.status(400)
  console.log(req.query.searchterm);
  const sharks = await prisma.shark.findMany({ 
    where: {
      name: {
        contains: req.query.searchterm,
        mode: 'insensitive'
      },
    }
  });
  
  if (!sharks) return res.status(404).send({message: "nicht gefunden"})
  console.log(sharks)

  res.send(sharks)



  
   
  // Hier Logik die laufen soll, wenn Route aufgerufen wird   
  //console.log("Hallo ich bin im Backend");
  
  // Antwort zurückschicken
})

/*app.get ("/sharks", async(req, res, next) =>{
  res.json({msg: "Hello from the GET /sharks handler"})
});*/

// Login Route
//app.post("/login", userLogin)


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