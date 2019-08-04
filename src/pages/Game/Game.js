import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("game")
@observer
class Game extends Component {
  state = {
    value: {
      0: "",
      1: "",
      2: ""
    }
  };
  handleChange = e => {
    e.preventDefault();
    this.setState({
      value: {
        ...this.state.value,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    // 저장
    try {
      await this.props.game.end(this.state.value);
      this.props.history.push("/cround");
    } catch (error) {
      this.props.history.push("/");
    }
  };
  componentDidMount() {
    if (!this.props.game.onStart) {
      alert("에러");
      this.props.game.end();
      this.props.history.push("/");
    }
  }
  render() {
    const { target } = this.props.game;
    return (
      <form style={styles.container}>
        <p>{target}</p>
        <input
          type="text"
          name={0}
          value={this.state.value[0]}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <input
          type="text"
          name={1}
          value={this.state.value[1]}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <input
          type="text"
          name={2}
          value={this.state.value[2]}
          onChange={this.handleChange}
          autoComplete="off"
        />
        <div onClick={this.handleSubmit}>저장하기</div>
      </form>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  }
};

export default Game;
