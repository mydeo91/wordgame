import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import MainButton from "../../components/Button/MainButton";

class SigninPage extends Component {
  state = {
    isFetching: false
  };

  // handle functions
  handleSignIn = async ({ type }) => {
    this.setState({
      isFetching: true
    });
    try {
      await this.signInWithSocialAccount({ type });
    } catch (e) {
      console.error(`[${e.code}] ${e.message}`);
    } finally {
      await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          // var isAnonymous = user.isAnonymous;
          // var uid = user.uid;
          localStorage.setItem("access_user", JSON.stringify(user));
        } else {
          // User is signed out.
          localStorage.removeItem("access_user");
        }
        // ...
      });

      this.setState(
        {
          isFetching: false
        },
        () => this.props.history.push("")
      );
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
      </>
    );
  }
}

export default SigninPage;
