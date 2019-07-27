import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import SubmitField from "../../components/InputField/Three";

@inject("users")
@observer
class SettingsPage extends Component {
  render() {
    return (
      <div style={styles.container}>
        <p style={styles.textGuide}>닉네임을 입력해주세요.</p>
        <SubmitField
          msg="닉네임 입력"
          func={async nickname => {
            await alert("DB에 씁니다");
            localStorage.setItem("nickname", nickname);
            this.props.history.push("/");
          }}
          {...this.props}
        />
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
    fontFamily: "Jeju Hallasan",
    marginLeft: 5,
    marginRight: 5
  }
};

export { SettingsPage };
