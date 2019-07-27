import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import BackButton from "../../components/Button/Back";
import { inject, observer } from "mobx-react";

export class Contribute extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Switch>
          <Route path="/contribute" exact component={Main} />
          <Route path="/contribute/submit" component={Submit} />
        </Switch>
        {/* <BrowserRouter>
        </BrowserRouter> */}
      </div>
    );
  }
}

const Main = inject("users")(
  observer(props => {
    function handleClick() {
      if (!props.users.user.isAnonymous) {
        props.history.push("/contribute/submit");
      } else {
        alert("회원가입 하세요");
      }
    }
    return (
      <>
        <div
          style={{
            marginBottom: 30,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div style={{ marginBottom: 5 }}>출제</div>
            <div style={Submit.style.input}>10</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column"
            }}
          >
            <div style={{ marginBottom: 5 }}>채택</div>
            <div style={Submit.style.input}>2</div>
          </div>
        </div>
        <div style={styles.button} onClick={handleClick}>
          문제 출제하기
        </div>
        <BackButton {...props} target="/" />
      </>
    );
  })
);

class Submit extends React.Component {
  state = {
    1: "",
    2: "",
    3: ""
  };
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
    await alert("참여 고맙습니다~");

    // write data to db
    await alert("DB write");

    // 마무리
    this.setState({ 1: "", 2: "", 3: "" }, () => {
      this.refs[1].focus();
      this.props.history.push("/contribute");
    });
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
        <div
          style={
            {
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // flexWrap: "wrap"
            }
          }
        >
          <input
            ref="1"
            name="1"
            style={Submit.style.input}
            maxLength={1}
            onKeyPress={this._handleKeyPress}
            value={this.state[1]}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input
            ref="2"
            name="2"
            style={Submit.style.input}
            maxLength={1}
            onKeyPress={this._handleKeyPress}
            value={this.state[2]}
            onChange={this.handleChange}
            autoComplete="off"
          />
          <input
            ref="3"
            name="3"
            style={Submit.style.input}
            maxLength={1}
            onKeyPress={this._handleKeyPress}
            value={this.state[3]}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </div>
        <BackButton {...this.props} />
      </>
    );
  }
}

Submit.style = {
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

const styles = {
  container: {
    padding: 10,
    flex: 1,
    borderBottom: "1px solid rgba( 0, 0, 0, 0.2 )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
    // position: "relative",
    // width: "100%",
    // height: "100%"
  },
  button: {
    backgroundColor: "rgba( 255, 255, 255, 0.5 )",
    paddingLeft: 10,
    paddingRight: 10,
    width: 200,
    height: 30,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    cursor: "pointer",
    textDecoration: "none",
    color: "inherit"
  }
};
