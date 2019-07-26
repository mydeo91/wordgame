import React from "react";
import { Route, Switch } from "react-router-dom";
import { Header, Footer } from "../components";
import { Signin } from "../pages";

const Router = props => [
  props.isLoggedIn ? <Header key={1} /> : <Header key={1} />,
  props.isLoggedIn ? <PrivateRoutes key={2} /> : <PublicRoutes key={2} />,
  props.isLoggedIn ? <Footer key={3} /> : <Footer key={3} />
];

const PrivateRoutes = props => (
  <div style={styles.container}>
    <Switch>
      <Route path="/" exact component={Amain} />
      <Route path="/b" component={Bmain} />
      <Route component={NoPage} />
    </Switch>
  </div>
);

const PublicRoutes = props => (
  <div style={styles.container}>
    <Switch>
      <Route path="/" exact component={Signin} />
      <Route path="/d" component={Dmain} />
      <Route component={NoPage} />
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

const Amain = () => <div>Amain</div>;
const Bmain = () => <div>Bmain</div>;
const Cmain = () => <div>Cmain</div>;
const Dmain = () => <div>Dmain</div>;
const NoPage = () => <div>NoPage</div>;

export default Router;
