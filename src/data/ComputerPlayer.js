import Player from './Player';
import getRandomCoords from '../helpers/getRandomCoords';
import forEachAdjacent from '../helpers/forEachAdjacent';
import squareIsShip from '../helpers/squareIsShip';
import squareAlreadyHit from '../helpers/squareAlreadyHit';

const ComputerPlayer = (opponent) => {
  const computerPlayer = Player();

  computerPlayer.opponent = opponent;

  computerPlayer.lastHitShipCoords;

  computerPlayer.makeTurn = function () {
    let hitCoords;

    if (!this.lastHitShipCoords) {
      while (true) {
        hitCoords = getRandomCoords();

        // if found a ship on a square that hasn't been hit before
        if (
          this.opponent.gameboard.board[hitCoords[0]][hitCoords[1]] !== null &&
          typeof this.opponent.gameboard.board[hitCoords[0]][hitCoords[1]] ===
            'object' &&
          this.opponent.gameboard.hitsBoard[hitCoords[0]][hitCoords[1]] === null
        ) {
          this.lastHitShipCoords = [hitCoords[0], hitCoords[1]];
        }

        // if found a square what hasn't been hit before
        if (
          this.opponent.gameboard.hitsBoard[hitCoords[0]][hitCoords[1]] === null
        ) {
          break;
        }
      }

      return this.opponent.gameboard.receiveAttack(hitCoords);
    }

    if (this.lastHitShipCoords) {
      const lastHit = this.lastHitShipCoords;
      const topBottomAdjacentCoords = [];
      topBottomAdjacentCoords.push([lastHit[0], lastHit[1] + 1]);
      topBottomAdjacentCoords.push([lastHit[0] + 1, lastHit[1]]);
      topBottomAdjacentCoords.push([lastHit[0], lastHit[1] - 1]);
      topBottomAdjacentCoords.push([lastHit[0] - 1, lastHit[1]]);

      while (true) {
        const index = Math.floor(Math.random() * 4);
        const boardSize = this.opponent.gameboard.board.length;

        if (
          topBottomAdjacentCoords[index][0] > boardSize - 1 ||
          topBottomAdjacentCoords[index][0] < 0 ||
          topBottomAdjacentCoords[index][1] > boardSize - 1 ||
          topBottomAdjacentCoords[index][1] < 0
        ) {
          continue;
        }

        hitCoords = [
          topBottomAdjacentCoords[index][0],
          topBottomAdjacentCoords[index][1],
        ];

        if (
          this.opponent.gameboard.hitsBoard[hitCoords[0]][hitCoords[1]] === null
        ) {
          break;
        }
      }

      return this.opponent.gameboard.receiveAttack(hitCoords);
    }
  };

  return computerPlayer;
};

export default ComputerPlayer;
