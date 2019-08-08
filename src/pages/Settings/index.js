import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { firebase } from "../../firebase";
import { inject, observer } from "mobx-react";
import SubmitField from "../../components/InputField/Three";

@inject("users")
@observer
class SettingsPage extends Component {
  state = {
    isFetching: false
  };
  setNickname = async nickname => {
    this.setState({ isFetching: true });

    // get uid from current login user.
    const data = {
      uid: firebase.auth().currentUser.uid,
      // uid: this.props.users.user.uid,
      nickname
    };

    const resultStatus = await this.props.users.setNickname(data);

    if (resultStatus) {
      const { user, fetchUser } = this.props.users;
      const { history } = this.props;
      await fetchUser().then(function() {
        // localStorage.setItem("nickname", data.nickname);
        history.push("/");
      });
    }
  };
  render() {
    return (
      <div style={styles.container}>
        <p style={styles.textGuide}>닉네임을 입력해주세요.</p>
        {this.state.isFetching ? (
          <div>Loading....</div>
        ) : (
          <SubmitField
            msg="닉네임 입력"
            func={nickname => this.setNickname(nickname)}
            {...this.props}
          />
        )}
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  textGuide: {
    margin: 0,
    marginBottom: 10
  },
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

export { SettingsPage };
