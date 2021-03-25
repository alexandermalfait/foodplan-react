import React, {useEffect, useState} from "react";
import firebaseApp from "./Firebase";
import firebase from "firebase";

export const AuthContext = React.createContext<firebase.User|null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [ currentUser, setCurrentUser ] = useState(null as firebase.User | null)

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(setCurrentUser)
    }, [])

    return <>
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    </>
}