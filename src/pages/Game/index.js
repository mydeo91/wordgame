import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import ReadyPage from "./Ready";
import GamePage from "./Game";

export const GameRouter = inject("game")(
  observer(props => {
    // 게임 자격 요건 확인
    //// 게임 자격 요건 확인
    if (props.game.onStart) {
      return <GamePage {...props} />;
    } else {
      return <ReadyPage />;
    }
  })
);
