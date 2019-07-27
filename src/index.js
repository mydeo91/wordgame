import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import UsersStore from "./stores/users";
import GameStore from "./stores/game";
import "./index.css";
import App from "./App";

const users = new UsersStore();
const game = new GameStore();

ReactDOM.render(
  <Provider users={users} game={game}>
    <App />
  </Provider>,
  document.getElementById("root")
);
