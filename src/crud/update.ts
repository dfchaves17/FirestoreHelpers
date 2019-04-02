/**
 * Author: David Chaves
 * Version: 1.0.0
 */

import * as admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

export const update = async (collection: string, id: string, data: {}) => {
    try {
        const ref = db.collection(collection).doc(id);
        const addData = await ref.update(data);
        console.log(addData);
    } catch (error) {
        return console.log(`Don't save data: ${error}`);
    }
};

export const updateTransaction = () => {


    return null;
};

// Initialize document
var cityRef = db.collection('cities').doc('SF');
var setCity = cityRef.set({
    name: 'San Francisco',
    state: 'CA',
    country: 'USA',
    capital: false,
    population: 860000
});

var transaction = db.runTransaction(t => {
    return t.get(cityRef)
        .then(doc => {
            // Add one person to the city population.
            // Note: this could be done without a transaction
            //       by updating the population using FieldValue.increment()
            var newPopulation = doc.data().population + 1;
            t.update(cityRef, {population: newPopulation});
        });
}).then(result => {
    console.log('Transaction success!');
}).catch(err => {
    console.log('Transaction failure:', err);
});
