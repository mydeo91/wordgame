import React from "react";
// import { initializeApp } from "firebase";
// import { firebaseConfig } from "./firebaseConfig";
import { inject, observer } from "mobx-react";
import { Provider } from "mobx-react";
import UsersStore from "./stores/users";
import GameStore from "./stores/game";
import { Header, Main, Footer } from "./components";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import PageRouter from "./router";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.users = UsersStore;
    this.game = GameStore;
  }
  componentDidMount() {}
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <Provider users={this.users} game={this.game}>
            <BrowserRouter>
              <PageRouter />
            </BrowserRouter>
          </Provider>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40
  },
  contentWrapper: {
    width: 300,
    minHeight: 400,
    backgroundColor: "rgba( 0, 0, 0, 0.2 )",
    borderRadius: 10
    // display: "flex",
    // justifyContent: "flex-start",
    // flexDirection: "column"
  }
};

export default App;
