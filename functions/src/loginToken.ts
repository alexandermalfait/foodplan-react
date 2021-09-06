import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import {FUNCTIONS_REGION} from "./index";

if (admin.apps.length === 0) {
    admin.initializeApp();
}

const https = functions.region(FUNCTIONS_REGION).https;

export const getLoginToken = https.onCall(async (data, context) => {
    const targetEmail = data.targetEmail as string;
    const currentUserIdToken = context.auth?.uid;

    if (!currentUserIdToken) {
        return null;
    }

    const firestore = admin.firestore();

    const userProfile = await firestore
        .collection("users")
        .where("profile.email", "==", targetEmail)
        .get();

    if (userProfile.docs.length > 0) {
        const userDocument = userProfile.docs[0];

        const userId = userDocument.id;

        const allowedUserIds = (userDocument.get("alternativeUserIdsAllowedForLogin") || []) as string[];

        if (allowedUserIds.includes(currentUserIdToken)) {
            console.log(
                `Creating login token for ${currentUserIdToken} to login as ${userDocument.get("profile.email")}`
            );

            return admin.auth().createCustomToken(userId);
        } else {
            console.log(`${currentUserIdToken} is not allowed to login as ${userDocument.get("profile.email")}`);
        }
    } else {
        console.log(`Couldn't find profile for ${targetEmail}`);
    }

    return null;
});

