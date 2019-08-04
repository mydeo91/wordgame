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

class Content extends React.Component {
  state = {
    holdTime: 0
  };
  limitTime = 1000;
  handleButtonPress = () => {
    console.log("press");
    this.holdTimeIntervalId = setInterval(
      () =>
        this.setState(prevState => ({
          holdTime: prevState.holdTime + 100,
          isHold: true
        })),
      100
    );
  };

  handleButtonRelease = () => {
    if (this.state.holdTime >= this.limitTime) {
      alert("좋아요");
    }
    clearInterval(this.holdTimeIntervalId);
    this.setState({ holdTime: 0, isHold: false });
  };
  render() {
    const { likes, profile, content } = this.props;
    console.log(this.state.holdTime);
    const color = {
      장인: "red",
      견습공: "green",
      입문: "black"
    };
    return (
      <div
        style={{
          ...this.styles.content,
          opacity: this.state.isHold ? 0.7 : 1,
          backgroundColor:
            this.state.holdTime >= this.limitTime
              ? "rgb(255, 0, 0, 0.5)"
              : "rgb(255, 255, 255, 0.5)",
          color: color[this.props.profile.grade]
        }}
        onTouchStart={this.handleButtonPress}
        onTouchEnd={this.handleButtonRelease}
        onMouseDown={this.handleButtonPress}
        onMouseUp={this.handleButtonRelease}
      >
        <div
          style={{
            textAlign: "center",
            marginTop: 5,
            marginBottom: 10,
            fontSize: 13,
            zIndex: 1
          }}
        >
          좋아요: {likes}개 / {profile.grade} {profile.nickname}
        </div>
        {content.map((item, key) => (
          <div key={key} style={this.styles.contentRow}>
            {item}
          </div>
        ))}
      </div>
    );
  }
  styles = {
    content: {
      backgroundColor: "rgb(255, 255, 255, 0.5)",
      borderRadius: 10,
      marginBottom: 20,
      padding: 10,
      width: 260,
      cursor: "pointer",
      zIndex: 2,
      position: "relative"
    },
    contentCover: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgb(0, 0, 0, 0.3)",
      zIndex: 3
    },
    contentRow: {
      width: 260,
      height: 20,
      borderBottom: "1px solid rgb(0, 0, 0, 0.5)",
      marginTop: 5,
      marginBottom: 5,
      zIndex: 1
    }
  };
}

export class Board extends Component {
  render() {
    const { pathname } = this.props.location;
    const data = {
      likes: 10,
      pupDate: "2019-07-19",
      profile: {
        grade: "장인",
        nickname: "얼쑤10"
      },
      content: ["1111", "2222", "3333"]
    };
    const data2 = {
      likes: 5,
      pupDate: "2019-07-19",
      profile: {
        grade: "견습공",
        nickname: "빠다10"
      },
      content: ["1111", "2222", "3333"]
    };
    const data3 = {
      likes: 0,
      pupDate: "2019-07-19",
      profile: {
        grade: "입문",
        nickname: "오노10"
      },
      content: ["1111", "2222", "3333"]
    };
    return (
      <>
        <div style={Board.styles.container}>
          <div style={Board.styles.boardWrapper}>
            {/* 3개의 컨텐츠까지만 */}
            <Content {...data} />
            <Content {...data2} />
            <Content {...data3} />
            <Content {...data} />
            <Content {...data2} />
            <Content {...data3} />
            <Content {...data} />
            <Content {...data2} />
            <Content {...data3} />
            <Content {...data3} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgb(255, 255, 255, 0.7)",
              border: "2px solid rgb(0, 0, 0, 0.2)",
              width: 80,
              height: 40,
              padding: 5,
              borderRadius: 25,
              fontSize: 12,
              cursor: "pointer"
            }}
          >
            더보기
            <img
              src={require("../../images/down-arrow-of-angle.png")}
              style={{
                marginLeft: 5,
                width: 15,
                height: 15
              }}
            />
          </div>
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
    padding: 10,
    overflow: "scroll"
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
    height: "auto",
    marginBottom: 20
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
    fontFamily: "East Sea Dokdo",
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
