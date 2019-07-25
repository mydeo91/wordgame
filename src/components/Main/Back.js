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
        Back
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
    fontSize: 15,
    position: "absolute",
    bottom: 10,
    left: 10
  },
  image: {
    width: 15,
    height: 15
  }
};
