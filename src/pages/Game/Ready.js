import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Wave, Random } from "react-animated-text";
import { inject, observer } from "mobx-react";

@inject("users", "game")
@observer
class ReadyPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 5
    };
  }

  moveBack = () => {
    alert("[GAME-READY] 알 수 없는 에러");
    this.props.history.push("/");
  };

  componentDidMount() {
    this.timer = setTimeout(this.moveBack, 7000);
    this.intervalId = setInterval(
      () => this.setState(pre => ({ sec: pre.sec - 1 })),
      1000
    );
  }
  componentWillUpdate() {
    const { users, game } = this.props;
    if (this.state.sec === 1) {
      clearInterval(this.intervalId);
      game.start(users.user);
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
