const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

admin.firestore().collection("users").listDocuments().then(userDocs => {
    userDocs.forEach(userDoc => {
        userDoc.collection("dishes").listDocuments().then(dishDocs => {
            dishDocs.forEach(async (dishDoc) => {
                await dishDoc.update({ imageThumbnailRefs: [] });

                const data = await dishDoc.get()

                console.log(`Updated dish ${dishDoc.id}: ${JSON.stringify(data.data())}`)
            })
        })
    })
})