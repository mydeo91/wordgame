import { observable, action, computed } from "mobx";
import firebase, { userRef, gameRef } from "../firebase";

class GameStore {
  // root store
  constructor(root) {
    this.root = root;
  }

  // Game inforemation
  @observable onStart = false;
  @observable round = currentRound().round;
  @observable target = currentRound().target;

  @action
  start(user) {
    console.log("[GAME-INFO]", this.round, this.target);
    // 게임 가능여부
    if (!userActions()) return;

    // 게임 시작
    this.onStart = true;
    // 포인트 차감
    console.log("[GAME-USER]", user);
    // 라운드 시작 플래그
  }

  @action
  end() {
    this.onStart = false;

    // 결과 반영
  }
}

function currentRound() {
  return { round: 10, target: "겜시작" };
}

function userActions() {
  let gameToken = false;
  // 게임이 가능한지 확인

  // 포인트 차감

  return gameToken;
}

export default GameStore;
