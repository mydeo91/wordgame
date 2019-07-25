import React from "react";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { Header, Main, Footer } from "./components";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

class App extends React.Component {
  componentDidMount() {
    this.project = initializeApp(firebaseConfig);
    console.log(this.project.name);
  }
  render() {
    return (
      <div style={styles.container}>
        <BrowserRouter>
          <div style={styles.contentWrapper}>
            <Header gameStart={false} />
            <Main />
            <Footer />
          </div>
        </BrowserRouter>
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
