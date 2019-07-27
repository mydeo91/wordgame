import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("users")
@observer
class Footer extends Component {
  render() {
    return (
      <footer style={styles.container}>
        {this.props.users.isLoggedIn ? <PrivateFooter /> : <PublicFooter />}
      </footer>
    );
  }
}

const PublicFooter = () => (
  <>
    <div style={styles.contentWrapper}>
      <a
        href="https://open.kakao.com/o/s1uEaAwb"
        target="_blank"
        style={styles.imgWrapper}
      >
        <img
          style={styles.chatImg}
          src={require("../../images/openChatRoom.png")}
        />
      </a>
      <div style={{ fontSize: 12 }}>광고주</div>
    </div>
    <div style={styles.contentWrapper}>
      <a
        href="https://open.kakao.com/o/s1uEaAwb"
        target="_blank"
        style={styles.imgWrapper}
      >
        <img
          style={styles.chatImg}
          src={require("../../images/openChatRoom.png")}
        />
      </a>
      <div style={{ fontSize: 12 }}>아이디어</div>
    </div>
  </>
);

const PrivateFooter = () => <div>Private</div>;

const styles = {
  container: {
    height: 80,
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10
  },
  contentWrapper: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 5
  },
  imgWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  chatImg: {
    width: 70,
    height: 70,
    borderRadius: 10,
    opacity: 0.8,
    marginBottom: 5
  }
};

export { Footer };
