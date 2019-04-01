/**
 * Author: David Chaves
 * Version: 1.0.0
 */

import * as admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

const add = async (collection: string, data: {}) => {
    try {
        const ref = db.collection(collection);
        const addData = await ref.add(data);
        console.log(addData.id);
    } catch (error) {
        return console.log(`Don't save data: ${error}`);
    }
};

const addOrRewrite = async (collection: string, data: any, id?: string) => {
    try {
        const ref = db.collection(collection);
        let documentData: any;
        documentData = ref.doc();
        if (id) {
            documentData = ref.doc(id);
            console.warn("Use personalize Id");
        }
        return await documentData.set(data);
    } catch (error) {
        return console.log(`Don't save data: ${error}`);
    }
};
