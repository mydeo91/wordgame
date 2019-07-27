import { observable, action, computed } from "mobx";

export default class UsersStore {
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
  logout = user => {
    this.user = null;
    localStorage.removeItem("user");

    // set login
    this.isLoggedIn = false;
    alert("로그아웃 되었습니다.");
  };

  @action
  update = user => {
    this.user = null;
    localStorage.removeItem("user");
  };
}
