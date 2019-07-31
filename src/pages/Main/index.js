import React from "react";
import firebase, { userRef } from "../../firebase";
import { Link, Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("users")
@observer
class MainPage extends React.Component {
  state = {
    user: null
  };
  async componentDidMount() {
    await this.props.users.fetchUser();
    console.log(this.props.users.user);
  }
  render() {
    // 신규 사용자라면? 익명 제외 --> settings
    if (!localStorage.getItem("nickname")) return <Redirect to="/settings" />;
    return (
      <>
        <Header />
        <Link style={styles.button} to="/game">
          게임시작
        </Link>
        <Link style={styles.button} to="/world">
          드립의 장으로 입장
        </Link>
        <Link style={styles.button} to="/profile">
          마이페이지
        </Link>
        <Link style={styles.button} to="/contribute">
          문제 출제 참여하기
        </Link>
      </>
    );
  }
}

const Header = inject("users")(
  observer(props => {
    const { photoURL, displayName } = JSON.parse(localStorage.getItem("user"));
    const nickname = localStorage.getItem("nickname");
    return (
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
            {displayName ? "" : `익명의 `}
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
            onClick={props.users.logout}
          >
            {displayName ? "로그아웃" : "회원가입하기"}
          </div>
        </div>
      </div>
    );
  })
);

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

export { MainPage };
