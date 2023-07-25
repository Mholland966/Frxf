import firebase from 'firebase/app';
import 'firebase/auth';
import { User } from '../types/user';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export const signup = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await auth.createUserWithEmailAndPassword(email, password);
    return {
      uid: response.user?.uid,
      email: response.user?.email,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const login = async (email: string, password: string): Promise<User | null> => {
  try {
    const response = await auth.signInWithEmailAndPassword(email, password);
    return {
      uid: response.user?.uid,
      email: response.user?.email,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const getCurrentUser = (): User | null => {
  const user = auth.currentUser;
  return user ? { uid: user.uid, email: user.email } : null;
};