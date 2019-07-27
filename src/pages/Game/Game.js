import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("game")
@observer
class Game extends Component {
  timeLimit = 15;
  gameStep = 3;
  state = {
    limitTime: 15,
    gameStep: 0,
    gameOver: false,
    valueStatus: { 0: "", 1: "", 2: "" },
    inputValue: ""
  };
  componentWillMount() {
    if (localStorage.getItem("game__status")) {
      alert("이미 게임을 하셨습니다.");
      this.props.history.push("/");
    }
  }
  componentDidMount() {
    this.intervalId = setInterval(
      () =>
        this.setState(prevState => ({ limitTime: prevState.limitTime - 1 })),
      1000
    );
  }
  gameOver = () => {
    clearInterval(this.intervalId);
    this.setState({
      limitTime: this.timeLimit,
      gameStep: 4,
      gameOver: true
    });
  };
  componentDidUpdate() {
    // Timeout --> gameover
    if (this.state.limitTime === 0 || this.state.gameStep === 3) {
      this.gameOver();
    }

    // forced mounting
  }
  handleChange = e => {
    const { gameStep, valueStatus } = this.state;
    const { value } = e.target;
    this.setState({ inputValue: value });
    e.preventDefault();
  };
  handleSubmit = e => {
    if (!this.state.gameOver && this.state.gameStep < 3) {
      this.setState(prevState => ({
        limitTime: this.timeLimit,
        gameStep: prevState.gameStep + 1,
        valueStatus: {
          ...this.state.valueStatus,
          [prevState.gameStep]: this.state.inputValue
        },
        inputValue: ""
      }));
    } else if (this.state.gameStep === 2) {
      // 결과 페이지
    } else {
      // 타임 아웃 페이지
    }
    e.preventDefault();
  };

  // Components
  OnGame = () => (
    <div style={styles.container}>
      <form style={styles.container} onSubmit={this.handleSubmit}>
        <input
          type="text"
          style={styles.inputField}
          value={this.state.inputValue}
          onChange={this.handleChange}
          autoFocus={true}
        />
      </form>
      <div style={styles.timer}>{this.state.limitTime}</div>
    </div>
  );

  render() {
    if (this.state.gameOver) {
      return (
        <EndGame
          result={Object.values(this.state.valueStatus)}
          {...this.props}
        />
      );
    } else {
      localStorage.setItem("game__status", 1);
      return <this.OnGame />;
    }
  }
}

async function forceQuitGame({ history, location }) {
  history.pushState(null, null, location.href);
  window.onpopstate = function(event) {
    history.go(1);
  };
  await alert("게임을 이미 하셨네요.");
  return <Redirect to="/" />;
}

const EndGame = ({ result, history }) => {
  const isForceQuit = result[0] === "" || result[1] === "" || result[2] === "";
  if (isForceQuit) {
    return (
      <div style={styles.container}>
        <div style={styles.resultWrapper}>
          <div style={styles.target}>
            <span style={{ color: "red" }}>삼행시</span>
          </div>
          <div style={styles.inputVal}>개못한다</div>
        </div>
        <div style={styles.inputVal}>다음 라운드에 지원하시게</div>
        <div style={styles.returnBtn} onClick={() => history.push("/")}>
          메인으로 돌아가기
        </div>
      </div>
    );
  } else {
    return (
      <div style={styles.container}>
        {result.map(item => {
          const target = item.charAt(0);
          const inputVal = item.substring(1);
          return (
            <div style={styles.resultWrapper}>
              <div style={styles.target}>{target}</div>
              <div style={styles.inputVal}>{inputVal}</div>
            </div>
          );
        })}
        <div style={styles.returnBtn} onClick={() => history.push("/")}>
          메인으로 돌아가기
        </div>
      </div>
    );
  }
};

const styles = {
  container: {
    position: "relative",
    zIndex: 2
  },
  inputField: {
    width: 250,
    height: 50,
    textAlign: "center",
    position: "relative",
    outline: "none",
    fontSize: 20,
    backgroundColor: "rgb(255, 255, 255, 0.1)",
    borderColor: "rgb(0, 0, 0, 0.2)",
    borderWidth: 0.1,
    zIndex: 9999,
    fontFamily: "Jeju Hallasan"
  },
  timer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 100,
    opacity: 0.2,
    zIndex: 1
  },
  resultWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  target: {
    fontSize: 30,
    fontWeight: "600",
    marginRight: 10
  },
  inputVal: {
    fontSize: 20
  },
  returnBtn: {
    marginTop: 15,
    backgroundColor: "rgb(255, 255, 255, 0.4)",
    width: 200,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    cursor: "pointer"
  }
};

export default Game;
