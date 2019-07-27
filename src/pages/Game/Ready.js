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
      sec: 5
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(
      () => this.setState(pre => ({ sec: pre.sec - 1 })),
      1000
    );
  }
  componentWillUpdate() {
    if (this.state.sec === 1) this.props.game.start();
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
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
