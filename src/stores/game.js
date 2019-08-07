import { observable, action, computed } from "mobx";
import firebase, { db, userRef, boardRef, gameRef } from "../firebase";

class GameStore {
  // root store
  constructor(root) {
    this.root = root;
    this.currentRound();
    this.checkEnableGame();
  }

  // Game inforemation
  @observable enableGame = true;
  @observable onStart = false;
  @observable round = 0;
  @observable boardId;
  @observable target = "";
  gamePoint = {
    0: 1,
    1: 10
  };

  @action
  async start(type) {
    try {
      await this.currentRound();
      // 게임 가능여부
      // await this.gamePointUpdate(this.gamePoint[type]);
      // board 생성
      const boardRef = db.collection("boards");
      const cround = this.round;
      const boardData = {
        uid: this.root.users.user.uid,
        gameId: cround,
        pubDate: new Date().getTime(),
        data: {
          "1": "",
          "2": "",
          "3": ""
        },
        likes: 0
      };
      return await boardRef
        .add(boardData)
        .then(boardDoc => {
          // 2. games --> bid 추가
          db.runTransaction(transaction => {
            const gameDocRef = gameRef.doc(`${cround}`);
            return transaction.get(gameDocRef).then(gameDoc => {
              if (!gameDoc.exists) {
                throw "게임 테이블이 존재하지 않습니다.";
              }
              const newBid = gameDoc.data().bid;
              const boardId = boardDoc.id;
              this.setBoardId(boardId);
              newBid.push(boardId);
              transaction.update(gameDocRef, { bid: newBid });
              return newBid;
            });
          })
            .then(newBid =>
              console.log("update game table is success.", newBid)
            )
            .catch(err => {
              console.error(err);
              throw "게임 테이블 업데이트 에러";
            });
          // game store update
          this.onStart = true;
          return { payload: boardDoc.id };
        })
        .catch(error => {
          console.error(error);
          throw "게시글 생성 에러";
        });
    } catch (error) {
      return { error };
    }
  }

  @action
  async end(data) {
    if (data !== undefined) {
      // 결과 반영
      return await boardRef
        .doc(this.boardId)
        .update({ data })
        .then(() => {
          console.log("데이터 입력 완료");
          this.clear();
        })
        .catch(err => {
          console.error(err);
          this.clear();
          throw "보드 업데이트 에러";
        });
    }
  }

  @action
  clear() {
    this.onStart = false;
    this.boardId = null;
  }

  @action
  getGameEnable() {
    return this.enableGame;
  }

  enableGame() {
    this.enableGame = true;
  }
  disableGame() {
    this.enableGame = false;
  }

  check() {
    const currentTime = new Date();
    const min = currentTime.getMinutes();
  }
  checkEnableGame() {
    // this.checkEnableIntervalId = setInterval(this.check, 1000);
  }

  setBoardId(boardId) {
    this.boardId = boardId;
  }

  async gamePointUpdate(point) {
    const { uid } = this.root.users.user;
    const userDocRef = userRef.doc(uid);

    await db
      .runTransaction(transaction => {
        return transaction.get(userDocRef).then(doc => {
          // 게임이 가능한지 확인
          if (doc.data().point >= point) {
            // 포인트 차감
            transaction.update(userDocRef, { point: doc.data().point - point });
            return { result: true };
          } else {
            // 게임 불가
            throw "포인트가 부족합니다.";
          }
        });
      })
      .catch(function(error) {
        console.error(error);
        throw error;
      });
  }

  async currentRound() {
    return await gameRef
      .orderBy("round", "desc")
      .limit(1)
      .get()
      .then(doc => {
        if (doc.empty) {
          return null;
        }

        let r = {};

        doc.forEach(item => {
          r.round = item.data().round;
          r.target = item.data().target;
        });

        console.log("[CROUND]", r);
        this.round = r.round;
        this.target = r.target;

        return r;
      })
      .catch(err => {
        console.error(err);
        throw "현재 라운드 조회 에러";
      });
  }
}

export default GameStore;
