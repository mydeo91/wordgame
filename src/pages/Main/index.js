import React, { Component } from "react";
import firebase, { userRef } from "../../firebase";
import { Link, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("users", "game")
@observer
class MainPage extends React.Component {
  state = {
    user: null,
    enableGame: false,
    isFetching: false
  };
  async componentDidMount() {
    await this.props.users.fetchUser();
    const enableGame = await this.props.game.getGameEnable();
    console.log("[[[]]]", enableGame);
    this.setState({ enableGame, isFetching: true });
  }
  fetchGameStatus = () => {
    var target = this.props.game.getGameEnable();
    console.log("fetch game status", target);
    if (this.state.enableGame !== target) {
      this.setState({ enableGame: target });
    }
  };
  render() {
    // 신규 사용자라면? 익명 제외 --> settings
    const { enableGame, isFetching } = this.state;
    const {
      users: { user },
      game: { round }
    } = this.props;
    if (!this.props.users.user.nickname) return <Redirect to="/settings" />;
    return (
      <>
        {isFetching ? <Header user={this.props.users.user} /> : <p>Loading</p>}
        {enableGame ? (
          <Link style={styles.button} to="/ready">
            시작
          </Link>
        ) : (
          <p>다음 라운드 : {round ? round + 1 : "-"} 라운드 준비 중</p>
        )}
        <Link style={styles.button} to="/cround">
          현재 라운드 게시글
        </Link>
        <Link style={styles.button} to="/around">
          명예의 전당
        </Link>
        {/* <Link style={styles.button} to="/contribute">
          문제 출제 참여하기
        </Link> */}
      </>
    );
  }
}

@inject("users")
@observer
class Header extends Component {
  render() {
    const {
      photoURL,
      displayName,
      email,
      grade,
      point,
      nickname
    } = this.props.user;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          justifyContent: "flex-start",
          marginTop: 10,
          marginBottom: 20,
          paddingBottom: 10,
          width: 300,
          position: "relative",
          borderBottom: "5px solid rgb(255, 255, 255, 0.2)"
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
            {displayName ? "" : <span style={{ fontSize: 12 }}>익명의</span>}
            {nickname}
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
            onClick={this.props.users.logout}
          >
            {displayName ? "로그아웃" : "회원가입"}
          </div>
        </div>
        {email ? (
          <>
            <div>
              <div style={{ position: "absolute", top: -5, right: 95 }}>
                등급
              </div>
              <div style={{ ...styles.circle, right: 85 }}>{grade}</div>
            </div>
            <div>
              <div style={{ position: "absolute", top: -5, right: 32 }}>
                포인트
              </div>
              <div style={styles.circle}>{point}</div>
            </div>
          </>
        ) : (
          <div>
            <div style={{ position: "absolute", top: -5, right: 32 }}>
              포인트
            </div>
            <div style={styles.circle}>{point}</div>
          </div>
        )}
      </div>
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
    marginLeft: 30,
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
  },
  circle: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: "600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 22.5,
    border: "2.5px solid rgb(255, 255, 255, 0.3)",
    position: "absolute",
    top: 5,
    right: 30
  }
};

export { MainPage };
