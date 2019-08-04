import React from "react";
import { Route, Switch } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Header, Footer } from "../components";
import {
  MainPage,
  SigninPage,
  GameRouter,
  GamePage,
  SettingsPage,
  TeamPage,
  BoardPage,
  Contribute
} from "../pages";

const Router = inject("users")(
  observer(({ users }) => [
    users.isLoggedIn ? <Header key={1} /> : <Header key={1} />,
    users.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
    users.isLoggedIn ? <Footer key={3} /> : <Footer key={3} />
  ])
);

const PrivateRoutes = props => (
  <div style={styles.container}>
    <Switch>
      <Route path="/" exact component={MainPage} />
      <Route path="/ready" component={GameRouter} />
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
