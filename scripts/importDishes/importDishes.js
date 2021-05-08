const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccount.json");

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "foodplan-1292f.appspot.com"
});

const UID = "uuWJNS1tuEgPUzXFTOWNgZvjMhu1";

const userDoc = admin.firestore().collection("users").doc(UID);

(async function() {
    const tags = (await userDoc.collection("tags").get()).docs.map(doc => ({
        id: doc.id, ...doc.data()
    }))

    const dishesCollection = userDoc.collection("dishes");

    const dishes = require("./dishes.json")

    const dishPictures = require("./dishpicture.json")

    for(const dishSource of dishes) {
        const dish = {
            name: dishSource.name,
            url: dishSource.url,
            addedAt: admin.firestore.Timestamp.now(),
            tags: [],
            imageRefs: []
        };

        if (dishSource.user_id === 34) {
            dish.tags.push(tags.find(t => t.name === "Bekkari"))
        } else {
            dish.tags.push(tags.find(t => t.name === "Oud"))
        }

        if (dishSource.vegetarian) {
            dish.tags.push(tags.find(t => t.name === "Veggie"))
        }

        const matchingPictures = dishPictures.filter(p => p.dish_id === dishSource.id);

        for(const dishPicture of matchingPictures) {
            await addDishPictureToDish(dishPicture, dish);
        }

        console.log(dish)

        const doc = await dishesCollection.add(dish);

        console.log(`Added ${dish.name}: ${doc.id}`)
    }
})()

async function downloadFile(fileUrl, outputLocationPath) {
    const fs = require("fs")
    const axios = require("axios")

    const writer = fs.createWriteStream(outputLocationPath);

    return axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    }).then(response => {

        //ensure that the user can call `then()` only when the file has
        //been downloaded entirely.

        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
                //no need to call the reject here, as it will have been called in the
                //'error' stream;
            });
        });
    });
}

async function addDishPictureToDish(dishPicture, dish) {
    const filename = dishPicture.filename;

    const sourceUrl = `http://foodplan.catsolutions.be/upload/dishes/${filename}`;

    const tmpFilePath = "tmp.jpg";

    await downloadFile(sourceUrl, tmpFilePath)

    console.log(`Uploading ${filename}`)

    const destination = `images/${UID}/${Date.now()}/${filename}`;
    await app.storage().bucket().upload(tmpFilePath, {destination: destination});

    const savedUrl = (await app.storage().bucket().file(destination).getSignedUrl({
        action: 'read',
        expires: '01-01-2200'
    }))[0]

    dish.imageRefs.push({path: destination, url: savedUrl})

    const fs = require("fs")

    fs.unlinkSync(tmpFilePath)
}
