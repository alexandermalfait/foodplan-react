import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
import * as imageThumbnail from "image-thumbnail";

type FileRef = { path: string, url: string };

if (admin.apps.length === 0) {
    admin.initializeApp();
}

const dishDocument = functions
    .region("europe-west1")
    .firestore
    .document("users/{uid}/dishes/{dishId}");

// noinspection JSUnusedGlobalSymbols
export const updateThumbnailsForDish = dishDocument.onWrite(async (change) => {
    const data = change.after.data();

    if (data && data.imageRefs) {
        const imageRefs = data.imageRefs as FileRef[];
        const imageThumbnailRefs = (data.imageThumbnailRefs || []) as FileRef[];

        if (!imageRefs.every(r => imageThumbnailRefs.find(t => t.path === getThumbnailPath(r)))) {
            const imageThumbnailRefs = await createThumbnails(data.imageRefs);

            return change.after.ref.set({imageThumbnailRefs: imageThumbnailRefs}, {merge: true});
        }
    }

    return null;
});

async function createThumbnails(originalImageRefs: FileRef[]):Promise<FileRef[]> {
    return Promise.all(originalImageRefs.map(async (imageRef) => {
        return await createThumbnail(imageRef);
    }));
}

function getThumbnailPath(imageRef: FileRef) {
    const parts = imageRef.path.split("/");

    parts.splice(-1, 0, "thumbnails");

    return parts.join("/");
}

async function createThumbnail(imageRef: FileRef, width = 200): Promise<FileRef> {
    const bucket = admin.storage().bucket();

    console.log(`Downloading original from ${imageRef.path}`);

    const [originalImageData] = await bucket.file(imageRef.path).download();

    console.log(`Resizing ${imageRef.path} to ${width} width`);

    const thumbnailBuffer = await imageThumbnail(originalImageData, {width: width, responseType: "buffer"});

    const thumbnailPath = getThumbnailPath(imageRef);

    console.log(`Uploading thumbnail to ${thumbnailPath}`);

    const bucketFile = bucket.file(thumbnailPath);
    await bucketFile.save(thumbnailBuffer, {public: true});
    const metaData = await bucketFile.getMetadata();

    const thumbnailUrl = metaData[0].mediaLink;

    return {path: thumbnailPath, url: thumbnailUrl};
}

