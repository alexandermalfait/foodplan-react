import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import * as imageThumbnail from "image-thumbnail";

admin.initializeApp();

const dishDocument = functions.firestore.document("users/{uid}/dishes/{dishId}");

// noinspection JSUnusedGlobalSymbols
export const updateThumbnailsForDish = dishDocument.onWrite(async (change) => {
    const data = change.after.data();

    if (data && data.imageRefs) {
        if (!data.imageThumbnailRefs || data.imageRefs.size() != data.imageThumbnailRefs.size()) {
            const imageThumbnailRefs = await createThumbnails(data.imageRefs);

            return change.after.ref.set({imageThumbnailRefs: imageThumbnailRefs}, {merge: true});
        }
    }

    return null;
});

type FileRef = { path: string, url: string };

async function createThumbnails(originalImageRefs: FileRef[]):Promise<FileRef[]> {
    return Promise.all(originalImageRefs.map(async (imageRef) => {
        return await createThumbnail(imageRef);
    }));
}

async function createThumbnail(imageRef: FileRef):Promise<FileRef> {
    const bucket = admin.storage().bucket();

    console.log(`Creating thumbnail for ${imageRef.path}`);

    const [originalImageData] = await bucket.file(imageRef.path).download();

    const thumbnailBuffer = await imageThumbnail(originalImageData, {width: 100, responseType: "buffer"});

    const thumbnailPath = `${imageRef.path}/thumbnail`;

    await bucket.file(thumbnailPath).save(thumbnailBuffer);

    const thumbnailUrl = (await bucket.file(thumbnailPath).getSignedUrl({
        action: "read",
        expires: "01-01-2200",
    }))[0];

    return {path: thumbnailPath, url: thumbnailUrl};
}

