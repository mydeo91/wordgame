import { observable, action, computed } from "mobx";
import firebase, { userRef } from "../firebase";

class UsersStore {
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
    Promise.all([
      localStorage.removeItem("user"),
      localStorage.removeItem("nickname")
    ]);

    await firebase.auth().logout();

    // set logout
    this.user = null;
    this.isLoggedIn = false;
    alert("로그아웃 되었습니다.");
  };

  @action
  update = user => {
    this.user = null;
    localStorage.removeItem("user");
  };

  @action
  fetchUser = async () => {
    await firebase.auth().onAuthStateChanged(user => this.getUser(user));
  };

  getUser = user => {
    console.log(`[ACCESSED-USER-STORE] ${user.uid}`);
    if (user) {
      this.user = userRef
        .doc(user.uid)
        .get()
        .then(doc => doc.data())
        .catch(() => null);
    }
  };
}

const userStore = new UsersStore();

export default userStore;
