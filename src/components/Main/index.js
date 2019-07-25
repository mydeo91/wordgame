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
    const signInResult = await this.signInWithSocialAccount({ type });
    this.setState({ isLoggedIn: true });
  };
  signInWithSocialAccount = async ({ type }) => {
    if (type === "Facebook") {
      var provider = await new firebase.auth.FacebookAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...

          localStorage.setItem("access_token", token);
          localStorage.setItem("access_user", JSON.stringify(user));
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(`[${errorCode}] ${errorMessage}`);
        });
    }
    const logonToken = { SIGNIN_TYPE: type, ACCESS_TOKEN: "access_token" };
    localStorage.setItem("logonToken", JSON.stringify(logonToken));
  };
  //// handle functions

  // Components
  OnMenu = () => {
    return this.state.isLoggedIn ? <this.LoggedOn /> : <this.SignIn />;
  };
  SignIn = () => {
    return (
      <>
        <div
          style={styles.button}
          onClick={() => this.handleSignIn({ type: "Facebook" })}
        >
          페이스북으로 로그인
        </div>
      </>
    );
  };
  LoggedOn = () => {
    if (!localStorage.getItem("game__status")) {
      // 라운드를 시작하기 전
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
              justifyContent: "center"
            }}
          >
            <img style={styles.profileImage} src={photoURL} />
            <p style={{ marginLeft: 10 }}>{displayName}</p>
          </div>
          <Link style={styles.button} to="/ready">
            게임시작
          </Link>
          <Link style={styles.button} to="/profile">
            나의 드립 확인하기
          </Link>
          <Link style={styles.button} to="/contribute">
            문제 출제 참여하기
          </Link>
        </>
      );
    } else {
      // 해당 시간에 이미 라운드를 진행한 경우
      return (
        <>
          <div style={{ marginBottom: 30 }}>00회차 게임 시작까지 00분 00초</div>
          <Link style={styles.button} to="/world">
            드립의 장으로 입장
          </Link>
          <Link style={styles.button} to="/profile">
            나의 드립 확인하기
          </Link>
          <Link style={styles.button} to="/contribute">
            문제 출제 참여하기
          </Link>
        </>
      );
    }
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
            path="/world"
            render={props => <Board type="world" {...props} />}
          />
          <Route
            path="/profile"
            render={props => <Board type="profile" {...props} />}
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
    marginBottom: 20,
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
