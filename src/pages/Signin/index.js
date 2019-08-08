import React, { Component } from "react";
import { firebase } from "../../firebase";
import { observer, inject } from "mobx-react";
import MainButton from "../../components/Button/MainButton";

@inject("users")
@observer
class SigninPage extends Component {
  state = {
    isLoading: false,
    error: null
  };
  // handle functions
  handleSignIn = async ({ type }) => {
    this.setState({ isLoading: true });
    const { signIn } = this.props.users;
    try {
      signIn(type);
    } catch (e) {
      console.error(`[${e.code}] ${e.message}`);
      this.setState({ error: "로그인 에러" });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { isLoading, error } = this.state;
    if (error) alert(error);
    return (
      <>
        <MainButton
          fnc={() => this.handleSignIn({ type: "Facebook" })}
          title="페이스북으로 로그인"
        />
        <MainButton
          fnc={() => this.handleSignIn({ type: "Anonymous" })}
          title="둘러보기"
        />
        <MainButton
          fnc={() => this.props.history.push("/team")}
          title="만든이들"
        />
        {isLoading && <div>로그인 중</div>}
      </>
    );
  }
}

export { SigninPage };
