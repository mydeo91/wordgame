import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Wave, Random } from "react-animated-text";
import { inject, observer } from "mobx-react";

@inject("game")
@observer
class ReadyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 5,
      path: "/"
    };
    this.checkPoint(0);
    this.intervalId = setInterval(
      () => this.setState(pre => ({ sec: pre.sec - 1 })),
      1000
    );
  }

  moveBack = () => {
    alert("[GAME-READY] 알 수 없는 에러");
    this.props.history.push("/");
  };

  checkPoint = async type => {
    const result = await this.props.game.start(type);
    if (result.payload) {
      console.log(`[BOARD-ID] ${result.payload}`);
      this.setState({ path: "/game" });
    } else {
      alert(result.error);
      this.props.history.push("/");
    }
  };

  async componentWillUpdate() {
    if (this.state.sec === 0) {
      clearInterval(this.intervalId);
      this.props.history.push(this.state.path);
    }
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  render() {
    return (
      <>
        <Wave text="준비되셨습니끄아ㅏㅏ" effect="stretch" effectChange={2.0} />
        <div style={{ fontSize: 70, fontWeight: "600", marginTop: 20 }}>
          {this.state.sec}
        </div>
      </>
    );
  }
}

export default ReadyPage;
