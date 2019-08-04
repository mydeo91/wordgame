import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import OnGame from "./Game";
import { Profile, Contribute, Loading, Board } from "./Pages";

export class Main extends Component {
  state = {
    onMenu: true,
    isLoggedIn: localStorage.getItem("access_user")
  };

  // handle functions
  handlePageChange = () => {
    this.setState({ onMenu: false });
  };
  handleSignIn = async ({ type }) => {
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

      this.setState({
        isLoggedIn: localStorage.getItem("access_user") ? true : false
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
        // .then(function(result) {
        //   // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //   var token = result.credential.accessToken;
        //   // The signed-in user info.
        //   var user = result.user;
        //   // ...

        //   // localStorage.setItem("access_token", token);

        // })
        .catch(function(error) {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          throw error;
        });
    } else {
      // Anonymous activity
      await firebase
        .auth()
        .signInAnonymously()
        .catch(function(error) {
          // var errorCode = error.code;
          // var errorMessage = error.message;
          throw error;
        });
    }
  };
  //// handle functions

  // Components
  OnMenu = () => {
    return this.state.isLoggedIn ? <this.LoggedOn /> : <this.SignIn />;
  };

  // 로그인 스크린
  SignIn = () => {
    return (
      <>
        <div
          style={styles.button}
          onClick={() => this.handleSignIn({ type: "Facebook" })}
        >
          페이스북으로 로그인
        </div>
        <div
          style={styles.button}
          onClick={() => this.handleSignIn({ type: "Anonymous" })}
        >
          비회원 로그인
        </div>
      </>
    );
  };
  LoggedOn = () => {
    const { photoURL, displayName } = JSON.parse(
      localStorage.getItem("access_user")
    );
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
            marginTop: 10,
            marginBottom: 20
          }}
        >
          <img
            style={styles.profileImage}
            src={photoURL || require("../../images/bag-on-head.png")}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignContent: "center",
              justifyContent: "center",
              marginLeft: 10
            }}
          >
            <p style={{ margin: 0, marginTop: 5, textAlign: "center" }}>
              {displayName || "익명의 누군가"}
            </p>
            <div
              style={{
                margin: 5,
                cursor: "pointer",
                backgroundColor: "rgb(255, 255, 255, 0.5)",
                textAlign: "center",
                padding: 5,
                borderRadius: 5
              }}
              onClick={() => {
                localStorage.removeItem("access_user");
                this.setState({ isLoggedIn: false });
              }}
            >
              {displayName ? "로그아웃" : "회원가입하기"}
            </div>
          </div>
        </div>
        {!localStorage.getItem("game__status") ? (
          <Link style={styles.button} to="/ready">
            게임시작
          </Link>
        ) : (
          <>
            <div style={{ marginBottom: 30 }}>
              00회차 게임 시작까지 00분 00초
            </div>
            <Link style={styles.button} to="/world">
              드립의 장으로 입장
            </Link>
          </>
        )}

        <Link style={styles.button} to="/profile">
          나의 드립 확인하기
        </Link>
        <Link style={styles.button} to="/contribute">
          문제 출제 참여하기
        </Link>
      </>
    );
  };
  //// Components

  render() {
    return (
      <main style={styles.container}>
        <Switch>
          <Route
            path="/"
            exact
            render={() => <this.OnMenu {...this.state} {...this.props} />}
          />
          <Route path="/ready" component={Loading} />
          <Route path="/game" component={OnGame} />
          <Route
            path="/cround"
            render={props => <Board type="cround" {...props} />}
          />
          <Route
            path="/around"
            render={props => <Board type="around" {...props} />}
          />
          <Route path="/contribute" component={Contribute} />
        </Switch>
      </main>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderBottom: "1px solid rgba( 0, 0, 0, 0.2 )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    minHeight: 200
  },
  wrapper: {
    // paddingBottom: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    // marginBottom: 20,
    borderRadius: 10
  },
  button: {
    backgroundColor: "rgba( 255, 255, 255, 0.5 )",
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
    height: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit"
  }
};
