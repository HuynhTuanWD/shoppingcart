import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBYkdFtcn86epuc1WQwPmk_XamstVwYdHI",
    authDomain: "shop-db-4f957.firebaseapp.com",
    databaseURL: "https://shop-db-4f957.firebaseio.com",
    projectId: "shop-db-4f957",
    storageBucket: "shop-db-4f957.appspot.com",
    messagingSenderId: "951794836174",
    appId: "1:951794836174:web:b65075bde86ed47f7ce69f",
    measurementId: "G-WQ71FPEY9P"
};

export const createUserProfileDocument = async (userAuth, addtionalData) => {
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
                ...addtionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    return userRef;
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;