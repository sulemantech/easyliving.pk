import React, { useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "ENTER YOUR OWN",
    authDomain: "ecom-db-f8713.firebaseapp.com",
    databaseURL: "https://ecom-db-f8713.firebaseio.com",
    projectId: "ecom-db-f8713",
    storageBucket: "ecom-db-f8713.appspot.com",
    messagingSenderId: "39362193920",
    appId: "1:39362193920:web:31d9128b6ebb77dc5d86e5",
    measurementId: "G-E4NJ30JCLD"
};

const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log("error creating user", error.message);
        }
    }
    return userRef;
};

const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });
    return await batch.commit();
};

const convertCollectionsSnapshotToMap = collections => {
    const transformedCollections = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        };
    });
    return transformedCollections.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};

firebase.initializeApp(config);

const auth = firebase.auth();
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
};

const Firebase = () => {
    useEffect(() => {
        firebase.initializeApp(config);
    }, []);

    return null;
};

export { createUserProfileDocument, addCollectionAndDocuments, 
    convertCollectionsSnapshotToMap, auth, firestore, signInWithGoogle };
export default Firebase;
