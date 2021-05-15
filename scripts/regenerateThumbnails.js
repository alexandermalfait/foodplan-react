const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

(async () => {
    const userDocs = await admin.firestore().collection("users").listDocuments()

    for (const userDoc of userDocs) {
        const dishDocs = await userDoc.collection("dishes").listDocuments()

        for (const dishDoc of dishDocs) {
            await dishDoc.update({ imageThumbnailRefs: [] });

            const data = await dishDoc.get()

            console.log(`Updated dish ${dishDoc.id}: ${JSON.stringify(data.data())}`)
        }
    }
})();

