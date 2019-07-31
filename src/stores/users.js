import { observable, action, computed } from "mobx";
import { firebase, userRef } from "../firebase";

class UserStore {
  // root store
  constructor(root) {
    this.root = root;
  }
  // User inforemation
  @observable user = JSON.parse(localStorage.getItem("user"));
  @observable isLoggedIn = Boolean(this.user);
  // @observable accessToken;

  @action
  login = user => {
    const { uid, displayName, email, isAnonymous, photoURL } = user;
    this.user = { uid, displayName, email, isAnonymous, photoURL };
    localStorage.setItem("user", JSON.stringify(this.user));

    // set login
    this.isLoggedIn = true;
    // alert("로그인 되었습니다.");
  };

  @action
  logout = async user => {
    this.user = null;
    this.isLoggedIn = false;
    Promise.all([
      localStorage.removeItem("user"),
      localStorage.removeItem("nickname")
    ]);

    // set logout
    await firebase.auth().signOut();
    alert("로그아웃 되었습니다.");
  };

  @action
  update = user => {
    this.user = null;
    localStorage.removeItem("user");
  };

  @action
  fetchUser = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) this.getUser(user);
    });
  };

  getUser = async user => {
    console.log(`[ACCESSED-USER-STORE] ${user.uid}`);
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
