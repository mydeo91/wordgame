import React, { Component } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import { Wave, Random } from "react-animated-text";
import BackButton from "./Back";

export class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sec: 5
    };
    console.log("askdaskhdksaldhaksl");
  }

  componentDidMount() {
    this.intervalId = setInterval(
      () => this.setState(pre => ({ sec: pre.sec - 1 })),
      1000
    );
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
  render() {
    const { sec } = this.state;
    if (sec === 0) {
      return <Redirect to="/game" />;
    } else {
      return (
        <>
          <Wave
            text="준비되셨습니끄아ㅏㅏ"
            effect="stretch"
            effectChange={2.0}
          />
          <div style={{ fontSize: 70, fontWeight: "600", marginTop: 20 }}>
            {this.state.sec}
          </div>
        </>
      );
    }
  }
}

const Content = ({ likes, pupDate, content }) => {
  return (
    <div style={Board.styles.content}>
      <div
        style={{
          textAlign: "center",
          marginTop: 5,
          marginBottom: 10,
          fontSize: 13
        }}
      >
        좋아요: {likes}개 / 게시일: {pupDate}
      </div>
      {content.map((item, key) => (
        <div key={key} style={Board.styles.contentRow}>
          {item}
        </div>
      ))}
    </div>
  );
};

export class Board extends Component {
  render() {
    const { pathname } = this.props.location;
    const data = {
      likes: 0,
      pupDate: "2019-07-19",
      content: ["1111", "2222", "3333"]
    };
    return (
      <>
        <div style={Board.styles.container}>
          <div style={Board.styles.boardWrapper}>
            {/* 3개의 컨텐츠까지만 */}
            <Content {...data} />
            <Content {...data} />
            <Content {...data} />
          </div>
          <div style={{ textAlign: "center" }}>1 2 3 4</div>
          <BackButton {...this.props} />
        </div>
      </>
    );
  }
}

Board.styles = {
  container: {
    top: 0,
    width: 280,
    minHeight: 180,
    maxHeight: 700,
    padding: 10
    // overflow: "hidden"
  },
  boardWrapper: {
    width: "100%",
    minHeight: 180,
    // backgroundColor: "rgb(255, 255, 255, 0.5)",
    // borderRadius: 10,
    display: "flex",
    // flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "column",
    overflow: "hidden",
    height: "auto",
    marginBottom: 20
  },
  content: {
    backgroundColor: "rgb(255, 255, 255, 0.5)",
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    width: 260
  },
  contentRow: {
    width: 260,
    height: 20,
    borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
    marginTop: 5,
    marginBottom: 5
  }
};

console.log(Board.styles);

export class Profile extends Component {
  render() {
    return (
      <>
        <div>마이페이지</div>
        <BackButton {...this.props} />
      </>
    );
  }
}

export class Contribute extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Switch>
          <Route path="/contribute" exact component={Main} />
          <Route path="/contribute/submit" component={Submit} />
        </Switch>
      </div>
    );
  }
}

const Main = props => (
  <>
    <div style={{ marginBottom: 10 }}>000님은 2개의 문제를 출제하셨고</div>
    <div style={{ marginBottom: 30 }}> 중 1개의 문제가 채택되었습니다.</div>
    <Link style={styles.button} to="/contribute/submit">
      문제 출제하기
    </Link>
    <BackButton {...props} target="/" />
  </>
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
