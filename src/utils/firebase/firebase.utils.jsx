import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAnQc3Ny4XMCOgWJNgZ8UlIz2vEcqFDcg8",

	authDomain: "cute-birds-db.firebaseapp.com",

	projectId: "cute-birds-db",

	storageBucket: "cute-birds-db.appspot.com",

	messagingSenderId: "484689068734",

	appId: "1:484689068734:web:2da6f0d2978fb37b6454ef"
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);

//Sign In with google pop up

const provider = new GoogleAuthProvider();

export const auth = getAuth(app);

export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

//Create user document

const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;

	// Create a referance and path for the document for the collection 'user'
	const userDocRef = doc(db, "users", userAuth.uid);

	// Get the data of a user
	let snapShot = await getDoc(userDocRef);

	// If the user data does not exist
	if (!snapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});

			await getDoc(userDocRef);
		} catch (error) {
			console.log("error creating the user", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	const userAuth = await signInWithEmailAndPassword(auth, email, password);

	return userAuth;
};
export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = callback => onAuthStateChanged(auth, callback);

export const getUserInfo = async userAuth => {
	if (!userAuth) return;

	//Create a referance and path for the document for the collection 'user'
	const userDocRef = doc(db, "users", userAuth.uid);
	// Get the data of a user
	let snapShot = await getDoc(userDocRef);
	if (snapShot.exists()) {
		return snapShot.data();
	}
};
