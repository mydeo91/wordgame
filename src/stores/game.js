import { observable, action, computed } from "mobx";

export default class GameStore {
  // Game inforemation
  @observable onStart = false;

  @action
  start() {
    this.onStart = true;
    // 포인트 차감

    // 라운드 시작 플래그
  }
  @action
  end() {
    this.onStart = false;

    // 결과 반영
  }
}
