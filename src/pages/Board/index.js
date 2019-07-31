import React from "react";
import BackButton from "../../components/Button/Back";
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
      position: "relative",
      WebkitUserSelect: "none",
      WebkitUserSrag: "none",
      WebkitAppRegion: "no-drag"
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

export class BoardPage extends React.Component {
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
        <div style={BoardPage.styles.container}>
          <div style={BoardPage.styles.boardWrapper}>
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

BoardPage.styles = {
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
