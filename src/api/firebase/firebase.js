import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCecX05DOBjhu0TRzE4JXvdn0bxIuPDuzc",
  authDomain: "daddit-6ce96.firebaseapp.com",
  databaseURL: "https://daddit-6ce96.firebaseio.com",
  projectId: "daddit-6ce96",
  storageBucket: "daddit-6ce96.appspot.com",
  messagingSenderId: "348267838168",
  appId: "1:348267838168:web:4f571fe4ac79476dae35ad"
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config);

      this.auth = app.auth();
      this.database = app.database();
    }
  }

  // AUTHENTICATION API
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () =>
    this.auth.signOut();

  doPasswordReset = email =>
    this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  doUpdateProfile = async profileInfo => {
    await this.auth.currentUser.updateProfile(profileInfo);
    await this.auth.currentUser.reload();
  }

  doGetCurrentUser = () =>
    this.auth.currentUser;

  doGetCurrentUserUID = () =>
    this.auth.currentUser ? this.auth.currentUser.uid : null;

  doGetDatabase = () =>
    this.database;

}

export default Firebase;