// Kontext dient dazu Werte und Funktionalität über Komponenten hinweg zur Verfügung zu stellen

import { createContext, useContext, useState } from "react";


// Kontextfunktionalität erzeugen und in UserContext speichern
const UserContext = createContext()



// Context Komponente die um unsere App gelegt wird
export function UserContextProvider({children}){

    // States den User betreffend
    const [isLoggedIn, setIsLoggedIn] = useState(false)
   

    // Funktionen den User betreffend
    function handleUserLogin(username, password){
        console.log(username, password)
        // Geh zum Backend schick username & password, bekomm eine Antwort, wenn es klappt dann
      
        setIsLoggedIn(true)
    }


    return (
        <UserContext.Provider 
            value={ {isLoggedIn, handleUserLogin} }>
                {children}
        </UserContext.Provider>
    )
}

// Hilfsfunktion (Hook) um später auf die Daten mit useUser() zugreifen zu können
export function useUser(){
    return useContext(UserContext)
}

