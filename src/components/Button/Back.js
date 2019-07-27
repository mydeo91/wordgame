import React, { Component } from "react";

export default class Back extends Component {
  constructor(props) {
    super(props);
  }
  goBack = () => {
    console.log(this.props.target);
    this.props.target
      ? this.props.history.push(this.props.target)
      : this.props.history.goBack();
  };
  render() {
    return (
      <div style={styles.container} onClick={this.goBack}>
        <img
          src={require("../../images/left-arrow-angle.png")}
          style={styles.image}
        />
        뒤로
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 12,
    position: "absolute",
    bottom: 10,
    right: 10,
    zIndex: 3,
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: "rgb(255, 255, 255, 0.7)",
    border: "2px solid rgb(0, 0, 0, 0.2)",
    padding: 5
  },
  image: {
    width: 15,
    height: 15
  }
};
