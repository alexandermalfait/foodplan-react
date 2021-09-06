// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
});

export default firebaseApp

export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider()

export const signInWithGoogle = () => {
    return auth.signInWithPopup(googleProvider)
}

export const signOut = () => {
    return auth.signOut()
}

export const signInAsUser = async (email: string):Promise<boolean> => {
    const result = await firebaseFunctions.httpsCallable("getLoginToken")({targetEmail: email})

    const loginToken = result.data as string

    console.log("got login token", loginToken)

    if (loginToken == null) {
        return false
    }

    const userCredential = await auth.signInWithCustomToken(loginToken);

    const user = userCredential.user;

    if (user) {
        console.log("logged in as ", user.email, user.uid);
    }

    return true
}

export const uploadFiles = async (files: FileList, path: string) => {
    return await Promise.all(Array.from(files).map(async file => {
        const result = await firebaseApp
            .storage()
            .ref(`${path}/${file.name}`)
            .put(file);

        return { path: result.ref.fullPath, url: await result.ref.getDownloadURL() as string }
    }))
}

export const downloadFile = async(path: string) => firebaseApp.storage().ref(path).getDownloadURL()

export const firebaseFunctions = firebaseApp.functions("europe-west1")

if(process.env['REACT_APP_USE_EMULATOR'] === "true") {
    firebaseFunctions.useEmulator("localhost", 5001)
}
