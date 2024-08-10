import Player from './Player';
import getUnhitSquareCoords from '../helpers/getUnhitSquareCoords';
import squareIsShip from '../helpers/squareIsShip';
import getNewPossibleHitCoordsAfterMultipleHits from '../helpers/getNewPossibleHitCoordsAfterMultipleHits';

const ComputerPlayer = (opponent) => {
  const computerPlayer = Player();

  computerPlayer.opponent = opponent;

  computerPlayer.lastHitShipCoords;

  computerPlayer.makeTurn = function () {
    let hitCoords;

    // Blank slate
    if (!this.lastHitShipCoords) {
      // Get a square that hasn't been hit before
      hitCoords = getUnhitSquareCoords(this.opponent.gameboard);

      const attackResult = this.opponent.gameboard.receiveAttack(hitCoords);

      if (squareIsShip(this.opponent.gameboard, hitCoords)) {
        if (
          !this.opponent.gameboard.board[hitCoords[0]][hitCoords[1]].isSunk()
        ) {
          this.lastHitShipCoords = [];
          this.lastHitShipCoords.push([hitCoords[0], hitCoords[1]]);
        } else {
          this.lastHitShipCoords = null;
        }
      }

      return attackResult;
    }

    // If hit a ship once
    if (this.lastHitShipCoords && this.lastHitShipCoords.length === 1) {
      const lastHit = this.lastHitShipCoords[0];
      const topBottomAdjacentCoords = [];
      topBottomAdjacentCoords.push(
        [lastHit[0], lastHit[1] + 1],
        [lastHit[0] + 1, lastHit[1]],
        [lastHit[0], lastHit[1] - 1],
        [lastHit[0] - 1, lastHit[1]],
      );

      // Find a cross-adjacent square to hit
      hitCoords = getUnhitSquareCoords(
        this.opponent.gameboard,
        topBottomAdjacentCoords,
      );

      const attackResult = this.opponent.gameboard.receiveAttack(hitCoords);

      if (squareIsShip(this.opponent.gameboard, hitCoords)) {
        if (
          !this.opponent.gameboard.board[hitCoords[0]][hitCoords[1]].isSunk()
        ) {
          this.lastHitShipCoords.push([hitCoords[0], hitCoords[1]]);
        } else {
          this.lastHitShipCoords = null;
        }
      }

      return attackResult;
    }

    // If hit a ship at least twice in a row
    if (this.lastHitShipCoords && this.lastHitShipCoords.length > 1) {
      // Find a square that is in the same row/column
      const newPossibleHitCoords = getNewPossibleHitCoordsAfterMultipleHits(
        this.lastHitShipCoords,
      );

      hitCoords = getUnhitSquareCoords(
        this.opponent.gameboard,
        newPossibleHitCoords,
      );

      const attackResult = this.opponent.gameboard.receiveAttack(hitCoords);

      if (squareIsShip(this.opponent.gameboard, hitCoords)) {
        if (
          !this.opponent.gameboard.board[hitCoords[0]][hitCoords[1]].isSunk()
        ) {
          this.lastHitShipCoords.push([hitCoords[0], hitCoords[1]]);
        } else {
          this.lastHitShipCoords = null;
        }
      }

      return attackResult;
    }
  };

  return computerPlayer;
};

export default ComputerPlayer;
