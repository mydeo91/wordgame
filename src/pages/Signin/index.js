import React, { Component } from "react";
import firebase from "firebase/app";
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
      await this.signInWithSocialAccount({ type });
    } catch (e) {
      console.error(`[${e.code}] ${e.message}`);
    } finally {
      await firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          users.login(user);
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
