import React, { Component } from "react";

export default class ThreeWordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      1: "",
      2: "",
      3: ""
    };

    // receive given props
    this.msg = this.props.msg;
    this.func = this.props.func;
  }
  componentDidMount() {
    for (let x in this.refs) {
      this.refs[x].onkeypress = e => this._handleKeyPress(e, this.refs[x]);
    }
  }

  // This checks ENTER key (13), then checks if next node is an INPUT
  // Then focuses next input box
  _handleKeyPress(e, field) {
    if (e.target.value.length === 0) return;

    if (e.keyCode === 13) {
      e.preventDefault(); // Prevent form submission if button present
      let next = this.refs[field.name].nextSibling;
      console.log("next", next);

      if (next && next.tagName === "INPUT") {
        this.refs[field.name].nextSibling.focus();
      } else {
        this.userSubmit();
      }
    }
  }
  userSubmit = async () => {
    let result = "";
    Object.values(this.state).forEach(value => {
      result += value;
    });
    if (result.length !== 3) return alert("제대로 써요");

    // msg
    if (this.msg) alert(this.msg);

    // execute given function with input result...
    if (this.func) this.func(result);

    // 마무리
    // this.setState({ 1: "", 2: "", 3: "" }, () => {
    //   this.refs[1].focus();
    // });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <>
        <div>
          <input
            ref="1"
            name="1"
            style={styles.input}
            maxLength={1}
            onKeyPress={this._handleKeyPress}
            value={this.state[1]}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input
            ref="2"
            name="2"
            style={styles.input}
            maxLength={1}
            onKeyPress={this._handleKeyPress}
            value={this.state[2]}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input
            ref="3"
            name="3"
            style={styles.input}
            maxLength={1}
            onKeyPress={this._handleKeyPress}
            value={this.state[3]}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </div>
        {/* <BackButton {...this.props} /> */}
      </>
    );
  }
}

const styles = {
  input: {
    width: 40,
    height: "auto",
    lineHeight: "normal",
    padding: ".4em .4em",
    backgroundColor: "rgb(255, 255, 255, 0.7)",
    border: "none",
    borderRadius: 10,
    outline: "none",
    textAlign: "center",
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "Jeju Hallasan",
    marginLeft: 5,
    marginRight: 5
  }
};
