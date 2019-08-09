import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { firebase } from "../../firebase";
import { inject, observer } from "mobx-react";
import SubmitField from "../../components/InputField/Three";

@inject("users")
@observer
class SettingsPage extends Component {
  state = {
    isFetching: false,
    nickname: "",
    msg: "닉네임을 입력해주세요"
  };
  MSG = {
    NORMAL: "닉네임을 입력해주세요",
    WARN: "닉네임은 3글자!",
    EXIST: "이미 있는 닉네임!",
    ERROR: "알 수 없는 에러",
    SUCCESS: "확인 완료"
  };
  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value.length > 3) {
      return this.setState({ msg: this.MSG.WARN });
    }
    this.setState({
      [name]: value,
      msg: this.MSG.NORMAL
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { nickname } = this.state;
    if (nickname.length !== 3) {
      return this.setState({ msg: this.MSG.WARN });
    }

    // setSettings
    try {
      const result = await this.props.users.setSettings({ nickname });
      this.setState({ msg: result ? this.MSG.SUCCESS : this.MSG.EXIST });
      if (result) this.props.history.push("/");
    } catch (error) {
      return this.setState({ msg: this.MSG.ERROR });
    }
  };
  render() {
    return (
      <form
        style={{ ...styles.common, ...styles.container }}
        onSubmit={this.handleSubmit}
      >
        <p style={styles.textGuide}>{this.state.msg}</p>
        {this.state.isFetching ? (
          <div>Loading....</div>
        ) : (
          <>
            <input
              type="text"
              style={styles.input}
              autoFocus={true}
              placeholder="3 글 자"
              name="nickname"
              value={this.state.nickname}
              onChange={this.handleChange}
            />
            <div style={{ ...styles.common, ...styles.btnWrapper }}>
              <div style={styles.btn} onClick={this.handleSubmit}>
                저장
              </div>
              <div style={styles.btn}>랜덤 생성</div>
            </div>
          </>
        )}
      </form>
    );
  }
}

const styles = {
  common: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flexDirection: "column"
  },
  textGuide: {
    margin: 0,
    marginBottom: 10,
    fontSize: 20
  },
  input: {
    backgroundColor: "rgb(255, 255, 255, 0.2",
    outline: "none",
    border: "none",
    width: 200,
    fontSize: 30,
    fontFamily: "East Sea Dokdo",
    position: "relative",
    textAlign: "center"
  },
  btnWrapper: {
    width: "100%",
    justifyContent: "space-around"
  },
  btn: {
    marginTop: 30,
    padding: 5,
    width: 60,
    textAlign: "center",
    border: "1.5px solid rgb(0, 0, 0, 0.3)",
    borderRadius: 5,
    fontSize: 18
  }
};

export { SettingsPage };
