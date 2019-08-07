import { observable, action, computed } from "mobx";
import { firebase, userRef } from "../firebase";

class UserStore {
  // root store
  constructor(root) {
    this.root = root;
  }
  // User inforemation
  // displayName, email, grade, isAnonymous, nickname, photoURL, point, uid
  @observable user = JSON.parse(localStorage.getItem("user"));
  @observable isLoggedIn = Boolean(this.user);
  // @observable accessToken;

  @action
  login = async user => {
    const { uid, displayName, email, isAnonymous, photoURL } = user;

    // get user info from firestore
    this.user = await userRef
      .doc(uid)
      .get()
      .then(doc => {
        return doc.data();
      })
      .catch(() => null);
    localStorage.setItem("user", JSON.stringify(this.user));

    // set login
    this.isLoggedIn = true;
    alert("로그인 되었습니다.");
    return this.user;
  };

  @action
  logout = async () => {
    this.user = null;
    this.isLoggedIn = false;
    Promise.all([
      localStorage.removeItem("user"),
      localStorage.removeItem("nickname")
    ]);

    // set logout
    return firebase
      .auth()
      .signOut()
      .then(function() {
        return true;
      })
      .catch(function() {
        return false;
      });
  };

  @action
  update = user => {
    this.user = null;
    localStorage.removeItem("user");
  };

  @action
  fetchUser = async () => {
    return await firebase.auth().onAuthStateChanged(user => {
      if (user) return this.getUser(user);
    });
  };

  setUser(user) {
    this.user = user;
  }

  getUser = async user => {
    if (user) {
      this.user = await userRef
        .doc(user.uid)
        .get()
        .then(doc => {
          return doc.data();
        })
        .catch(() => null);
    }
  };
}

export default UserStore;
