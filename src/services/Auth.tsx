import React, {useEffect, useState} from "react";
import firebaseApp from "./Firebase";
import firebase from "firebase";
import {UsersDb} from "./UsersDb";

export const AuthContext = React.createContext<firebase.User|null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const [ currentUser, setCurrentUser ] = useState(null as firebase.User | null)

    useEffect(() => {
        firebaseApp.auth().onAuthStateChanged(user => {
            setCurrentUser(user)

            if (user) {
                new UsersDb(user).saveProfile().catch(reason => alert(reason))
            }
        })
    }, [])

    return <>
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    </>
}