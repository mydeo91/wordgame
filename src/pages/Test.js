import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

// images
import Dot1 from "../images/dot1.png";
import Dot2 from "../images/dot2.png";
import Dot3 from "../images/dot3.png";

@inject("game")
@observer
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {
        0: "",
        1: "",
        2: ""
      },
      warn: "",
      remainTime: 0
    };
    this.limitMin = 50;
    this.maxLength = 20;
    this.warnningMsg = `${this.maxLength}자 이내`;
    // this.props.game.start();
  }
  handleChange = e => {
    e.preventDefault();
    const value = e.target.value;
    if (value.length >= this.maxLength) {
      //   this.setState({ warn: this.warnningMsg });
    } else {
      this.setState({
        value: {
          ...this.state.value,
          [e.target.name]: value
        }
      });
    }
  };
  handleBlur = e => {
    e.preventDefault();
    const value = e.target.value.trim();
    this.setState({ [e.target.name]: value, warn: "" });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // 저장
    const check = Object.values(this.state.value).every((item, index) => {
      // console.log('첫글자: ',item.splitI()[0])
      // let
      // if(item.split()[0] !== this.state.value[index])
      return item.length > 1;
    });
    if (!check) return alert("똑바로");
    try {
      await this.props.game.end(this.state.value);
      this.props.history.push("/cround");
    } catch (error) {
      this.props.history.push("/");
    }
  };
  componentDidMount() {
    if (!this.props.game.onStart) {
      this.gameover();
    }
    // 남은 시간 계산
    const currentMin = new Date().getMinutes();
    const remainTime = this.limitMin - currentMin;
    if (remainTime < 0) {
      alert("라운드가 마감되었습니다.");
      this.gameover();
    }
    this.setState({ remainTime });
  }
  gameover = async () => {
    await this.props.game.end();
    this.props.history.push("/");
  };
  InputWrapComponent = ({ name, target }) => (
    <>
      <div style={styles.inputWrapper}>
        <div style={{ position: "relative" }}>
          <div style={styles.targetBackgroundImage} />
          <div style={styles.targetWord}>{target}</div>
        </div>

        <div>
          <input
            type="text"
            name={name}
            value={this.state.value[name]}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            autoComplete="off"
            placeholder="20자 이내로 작성"
            style={styles.inputText}
          />
          <p style={{ margin: 0, position: "absolute" }}>{this.state.warn}</p>
        </div>
      </div>
    </>
  );
  render() {
    const { target, round } = this.props.game;
    const targetWordArr = String(target).split("");
    const { warn, remainTime } = this.state;
    return (
      <form style={styles.container}>
        <p style={{ fontSize: 18, color: remainTime < 3 ? "red" : "black" }}>
          {target || "-"} / {round || "-"} 라운드 / 종료 {remainTime}분 전
        </p>
        <this.InputWrapComponent name={0} target={targetWordArr[0]} />
        <this.InputWrapComponent name={1} target={targetWordArr[1]} />
        <this.InputWrapComponent name={2} target={targetWordArr[2]} />
        <div style={styles.submit} onClick={this.handleSubmit}>
          저장하기
        </div>
      </form>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    flexDirection: "column",
    width: "90%"
  },
  inputWrapper: {
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20
  },
  targetBackgroundImage: {
    backgroundImage: `url(${Dot1})`,
    backgroundPosition: "center",
    backgroundSize: "container",
    backgroundRepeat: "no-repeat",
    opacity: 0.3,
    width: 50,
    height: 50,
    position: "absolute",
    top: -25,
    left: -65
  },
  targetWord: {
    position: "absolute",
    top: -31.5,
    left: -57,
    fontSize: 50,
    fontWeight: "600"
  },
  inputText: {
    backgroundColor: "rgb(255, 255, 255, 0.2",
    outline: "none",
    border: "none",
    width: 200,
    fontSize: 20,
    fontFamily: "East Sea Dokdo",
    position: "relative"
  },
  submit: {
    width: 100,
    hwight: 50,
    border: "2px solid rgb(0, 0, 0, 0.3)",
    marginBottom: 10,
    textAlign: "center",
    cursor: "pointer"
  }
};

export { Test };
