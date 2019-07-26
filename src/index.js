import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import UsersStore from "./stores/users";
import "./index.css";
import App from "./App";

const users = new UsersStore();

ReactDOM.render(
  <Provider users={users}>
    <App />{" "}
  </Provider>,
  document.getElementById("root")
);
