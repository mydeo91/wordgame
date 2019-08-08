import { observable, action, computed } from "mobx";
import { firebase, userRef } from "../firebase";
import { sleep } from "../util";

// User inforemation
// displayName, email, grade, isAnonymous, nickname, photoURL, point, uid
class UserStore {
  // root store
  constructor(root) {
    this.root = root;
    this.fetchUser();
  }

  // field values   ============================================
  authUser = null;
  @observable user = null;
  @observable isLoggedIn = Boolean(this.authUser);

  // action methods ============================================
  @action
  signIn = async type => {
    const that = this;
    if (type === "Facebook") {
      // 1. set auth persistance = LOCAL
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          // 2. sign in with facebook
          const provider = new firebase.auth.FacebookAuthProvider();
          firebase
            .auth()
            .signInWithPopup(provider)
            .then(givenUser => this.setAuthUser(givenUser.user))
            .catch(error => {
              throw error;
            });
        });
    } else if (type === "Anonymous") {
      // 1. set auth persistance = SESSION
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // 2. sign in with anonymously
          firebase
            .auth()
            .signInAnonymously()
            .then(givenUser => that.setAuthUser(givenUser.user))
            .catch(error => {
              throw error;
            });
        });
    }
  };
  @action
  signOut() {
    if (firebase.auth().currentUser) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.setAuthUser(null);
        });
    }
  }
  @action
  fetchUser() {
    this.authUser = firebase.auth().currentUser;
    if (this.authUser) {
      return userRef
        .doc(this.authUser.uid)
        .get()
        .then(doc => {
          this.user = doc.data();
        });
    } else {
      return null;
    }
  }

  // field methods ============================================
  setAuthUser(authUser) {
    console.log("setAuthUser");
    this.authUser = authUser;
    if (authUser) {
      console.log("localstorage");
      localStorage.setItem("user", authUser.uid);
    } else {
      localStorage.removeItem("user");
    }
  }
}

export default UserStore;
