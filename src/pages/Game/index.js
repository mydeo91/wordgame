import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Redirect } from "react-router-dom";

import ReadyPage from "./Ready";
import GamePage from "./Game";

@inject("users", "game")
@observer
class GameRouter extends Component {
  state = {
    onReady: false
  };
  readyToStart = () => {
    this.setState({ onReady: true });
  };
  back = () => {
    this.props.history.push("/");
  };
  render() {
    console.log("render game router");
    if (!this.props.users.user) return <Redirect to="/" />;
    if (this.state.onReady) {
      return <ReadyPage {...this.props} />;
    }
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column"
        }}
      >
        <p>게임 규칙 설명</p>
        <div onClick={this.readyToStart}>시작하기</div>
        <div onClick={this.back}>뒤로가기</div>
      </div>
    );
  }
}

export { GameRouter, GamePage };
