import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { firebase } from "../firebase";
import { sleep } from "../util";
import { Header, Footer } from "../components";
import {
  MainPage,
  SigninPage,
  GameRouter,
  GamePage,
  SettingsPage,
  TeamPage,
  BoardPage,
  Contribute,
  Test
} from "../pages";

// const Router = inject("users")(
//   observer(({ users }) => [
//     users.isLoggedIn ? <Header key={1} /> : <Header key={1} />,
//     users.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
//     <Footer key={3} />
//   ])
// );

@inject("users")
@observer
class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: localStorage.getItem("user")
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(async authUser => {
      // 인증 객체가 확인되면, user 데이터 객체를 확인
      console.log("auth listener running...");
      if (authUser) {
        sleep(2 * 1000);
        this.setState({ authUser });
      } else {
        this.setState({ authUser: null });
      }
    });
  }

  render() {
    const { authUser } = this.state;
    const check = authUser || localStorage.getItem("user");
    return (
      <>
        <Header />
        {check ? <PrivateRoutes /> : <PublicRoutes />}
        <Footer />
      </>
    );
  }
}

const PrivateRoutes = props => (
  <div style={styles.container}>
    <Switch>
      {/* <Route path="/" exact component={Test} /> */}
      <Route path="/" exact component={MainPage} />
      <Route path="/ready" component={GameRouter} />
      {/* <Route path="/ready" component={Test} /> */}
      <Route path="/game" component={GamePage} />
      <Route path="/cround" component={BoardPage} />
      <Route path="/around" component={BoardPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route path="/contribute" component={Contribute} />
      <Route component={NoPage} />
    </Switch>
  </div>
);

const PublicRoutes = props => (
  <div style={styles.container}>
    <Switch>
      <Route path="/" exact component={SigninPage} />
      <Route path="/team" component={TeamPage} />
      <Route component={SigninPage} />
    </Switch>
  </div>
);

const styles = {
  container: {
    flex: 1,
    borderBottom: "1px solid rgba( 0, 0, 0, 0.2 )",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    width: "100%",
    minHeight: 200
  }
};

const Dmain = () => (
  <div>
    <p>손현수</p>
    <p>이은호</p>
  </div>
);
const NoPage = () => <div>NoPage</div>;

export default Router;
