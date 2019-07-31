import userStore from "./users";
import gameStore from "./game";

export default class RootStore {
  constructor() {
    this.users = new userStore(this);
    this.game = new gameStore(this);
  }
}
