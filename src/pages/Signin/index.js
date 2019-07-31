import React, { Component } from "react";
import firebase from "firebase";
import "firebase/auth";
import { observer, inject } from "mobx-react";
import MainButton from "../../components/Button/MainButton";

@inject("users")
@observer
class SigninPage extends Component {
  state = {
    isFetching: false
  };
  // handle functions
  handleSignIn = async ({ type }) => {
    const { users } = this.props;
    this.setState({
      isFetching: true
    });
    try {
      if (type === "Facebook") {
        // set auth persistance for LOCAL
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => {
            // Facebook activity
            const provider = new firebase.auth.FacebookAuthProvider();
            firebase
              .auth()
              .signInWithPopup(provider)
              .catch(function(error) {
                // make error
                throw error;
              });
            return firebase
              .auth()
              .signInWithPopup(provider)
              .catch(function(error) {
                // make error
                throw error;
              });
          });
      } else {
        // set auth persistance for LOCAL
        await firebase
          .auth()
          .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
          .then(() => {
            // Anonymous activity
            return firebase
              .auth()
              .signInAnonymously()
              .catch(function(error) {
                // make error
                throw error;
              });
          });
      }
    } catch (e) {
      console.error(`[${e.code}] ${e.message}`);
    } finally {
      await firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
          // User is signed in.
          await users.login(user);
        } else {
          // User is signed out.
          users.logout(user);
        }
        // ...
      });

      this.setState({
        isFetching: false
      });
    }
  };
  signInWithSocialAccount = async ({ type }) => {
    if (type === "Facebook") {
      // Facebook activity
      const provider = await new firebase.auth.FacebookAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .catch(function(error) {
          // make error
          throw error;
        });
    } else {
      // Anonymous activity
      await firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          // make error
          throw error;
        });
    }
  };
  render() {
    return (
      <>
        <MainButton
          fnc={() => this.handleSignIn({ type: "Facebook" })}
          title="페이스북으로 로그인"
        />
        <MainButton
          fnc={() => this.handleSignIn({ type: "Anonymous" })}
          title="둘러보기"
        />
        <MainButton
          fnc={() => this.props.history.push("/team")}
          title="만든이들"
        />
        {this.state.isFetching && <div>로그인 중</div>}
      </>
    );
  }
}

export { SigninPage };
