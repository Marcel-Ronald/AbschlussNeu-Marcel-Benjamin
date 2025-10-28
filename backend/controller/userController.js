import createHttpError from "http-errors"
// import prisma from "../prisma/client.js"


export async function userLogin(req,res, next){
    // username und password aus body auslesen
    
    // Wenn username oder password fehlen, wird Fehler geschickt
        
    // user in Datenbank suchen, wenn user fehlt Fehler werfen, z.B.:
    
    // if (!user) return next(createHttpError(401, "Error with user or password"))
    
    // Passwort vergleichen (HASHEN!!!), wenn nicht übereinstimmen Fehler werfen

    // User zurückschicken

    res.send({user: "Testuser"})
}