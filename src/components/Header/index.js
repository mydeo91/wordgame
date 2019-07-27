import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Word from "./Word";

function checkRoundStateFunc() {
  // [연월시분:check] 와 같은 포맷으로 게임 여부를 체크해야함
  // interval은 그냥 1초로 하자
  var startTime = new Date("18/2/1991");
  const currentTime = new Date();
  const roundChecker = (currentTime - startTime) % 600 === 0 ? true : false;
  console.log(currentTime);
  console.log(roundChecker ? "라운드 시작" : "라운드 종료");
}

export class Header extends Component {
  checkRoundState = () => {
    this.intervalId = setInterval(() => checkRoundStateFunc(), 1000);
  };
  componentDidMount() {
    // 현재 라운드 스테이트 체크
    this.checkRoundState();
  }
  render() {
    return (
      <header style={styles.container}>
        <Switch>
          <Route path="/" exact component={BeforeGameStart} />
          <Route component={OnGameStart} />
        </Switch>
      </header>
    );
  }
}

const OnGameStart = ({ location }) => {
  const items = {
    "/settings": "닉네임",
    "/ready": "준비해",
    "/game": "렛츠고",
    "/world": "드립장",
    "/profile": "내드립",
    "/contribute": "참여해"
  };
  const target = items[location.pathname];
  let valueArr = ["삼", "행", "시"];
  if (target !== undefined) {
    valueArr = items[location.pathname].split("");
  }
  return (
    <>
      {valueArr.map((value, index) => (
        <Word key={index} value={value} />
      ))}
    </>
  );
};
const BeforeGameStart = ({ item }) => {
  item = "시작전";
  const valueArr = item.split("");
  return (
    <>
      {valueArr.map((value, index) => (
        <Word key={index} value={value} />
      ))}
    </>
  );
};

const styles = {
  container: {
    height: 100,
    borderBottom: "1px solid rgba( 0, 0, 0, 0.2 )",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
};
