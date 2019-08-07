import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Word from "./Word";
import { inject, observer } from "mobx-react";

function checkRoundStateFunc() {
  // [연월시분:check] 와 같은 포맷으로 게임 여부를 체크해야함
  // interval은 그냥 1초로 하자
  var startTime = new Date("18/2/1991");
  const currentTime = new Date();
  const roundChecker = (currentTime - startTime) % 600 === 0 ? true : false;
  console.log(currentTime);
  console.log(roundChecker ? "라운드 시작" : "라운드 종료");
}

@inject("users", "game")
@observer
class Header extends Component {
  constructor(props) {
    super(props);
  }

  checkRoundState = () => {
    this.intervalId = setInterval(() => checkRoundStateFunc(), 1000);
  };
  componentDidMount() {
    // 현재 라운드 스테이트 체크
    // this.checkRoundState();
  }
  render() {
    const { onStart, round, target } = this.props.game;
    const { isLoggedIn } = this.props.users;
    return (
      <header style={styles.container}>
        {/* {isLoggedIn ? "로그인" : "NULL"}
        {onStart ? "시작합니다." : "준비합니다."} */}
        <Switch>
          {/* <Route path="/ready" exact component={BeforeGameReady} />
          <Route path="/game" exact component={OnGameStart} /> */}
          <Route component={BeforeGameStart} />
        </Switch>
      </header>
    );
  }
}

const OnGameStart = inject("users", "game")(
  observer(({ game }) => {
    const target = game.target;
    return <p>{target}</p>;
  })
);
const BeforeGameStart = () => {
  return (
    <>
      <img
        src={require("../../images/main_header.png")}
        style={{ width: 250, position: "absolute", top: -100 }}
      />
      <p>헤더</p>
    </>
  );
};
const BeforeGameReady = () => {
  return <p>게임 준비</p>;
};
// const BeforeGameStart = ({ item }) => {
//   item = "시작전";
//   const valueArr = item.split("");
//   return (
//     <>
//       {valueArr.map((value, index) => (
//         <Word key={index} value={value} />
//       ))}
//     </>
//   );
// };
// const BeforeGameReady = ({ item = "시작전" }) => {
//   const valueArr = item.split("");
//   return (
//     <>
//       {valueArr.map((value, index) => (
//         <Word key={index} value={value} />
//       ))}
//     </>
//   );
// };

const styles = {
  container: {
    height: 50,
    borderBottom: "1px solid rgba( 0, 0, 0, 0.2 )",
    paddingLeft: 20,
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "space-between",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  }
};

export { Header };
