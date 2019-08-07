import React, { Component } from "react";
import { firebase } from "../../firebase";
import { observer, inject } from "mobx-react";
import MainButton from "../../components/Button/MainButton";

@inject("users")
@observer
class SigninPage extends Component {
  state = {
    isFetching: false,
    authResult: null
  };
  componentDidMount() {
    this.props.users.logout();
  }
  // handle functions
  handleSignIn = async ({ type }) => {
    const { login, logout } = this.props.users;
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
      const authResult = await firebase
        .auth()
        .onAuthStateChanged(function(user) {
          if (user) {
            // User is signed in.
            return login(user);
          } else {
            // User is signed out.
            return logout(user);
          }
        });

      this.setState({
        isFetching: false,
        authResult
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
