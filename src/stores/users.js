import { observable, action, computed } from "mobx";
import { firebase, userRef } from "../firebase";
import { sleep } from "../util";

// User inforemation
// displayName, email, grade, isAnonymous, nickname, photoURL, point, uid
class UserStore {
  // root store
  constructor(root) {
    this.root = root;
    // this.fetchUser();
  }

  // field values   ============================================
  authUser = null;
  @observable user = null;
  @observable isLoggedIn = Boolean(this.authUser);

  // action methods ============================================
  @action
  signIn = async type => {
    // 로그인
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
      // 1. set auth persistance = LOCAL
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
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
      localStorage.setItem("Anonymous_log", new Date().getTime());
    }
  };
  @action
  signOut = () => {
    // 로그아웃
    const user = firebase.auth().currentUser;
    if (user) {
      if (user.isAnonymous) {
        user
          .delete()
          .then(() => {
            this.setAuthUser();
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.setAuthUser(null);
          });
      }
    }
  };
  @action
  fetchUser = async () => {
    // 유저 동기화
    this.authUser = firebase.auth().currentUser;
    if (this.authUser) {
      this.setAuthUser(this.authUser);
      return await userRef
        .doc(this.authUser.uid)
        .get()
        .then(doc => {
          this.user = doc.data();
          return this.user;
        })
        .catch(error => {
          console.error(error);
          return null;
        });
    } else {
      return null;
    }
  };
  @action
  setSettings = async ({ nickname }) => {
    // 세팅 설정
    if (nickname && nickname.length === 3) {
      // 닉네임 검색
      return await userRef
        .where("nickname", "==", nickname)
        .get()
        .then(querySnapshot => {
          if (querySnapshot.empty) {
            return userRef
              .doc(localStorage.getItem("user"))
              .update({ nickname })
              .then(() => {
                localStorage.setItem("nickname", nickname);
                return true;
              })
              .catch(error => {
                console.error(error);
                throw "업데이트 에러";
              });
          } else {
            return false;
          }
        })
        .catch(error => {
          console.error(error);
          throw "쿼리 에러";
        });
    } else throw "인풋 오류";
  };

  // field methods ============================================
  setAuthUser(authUser) {
    this.authUser = authUser;
    if (authUser) {
      localStorage.setItem("user", authUser.uid);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("nickname");
    }
  }
}

export default UserStore;
