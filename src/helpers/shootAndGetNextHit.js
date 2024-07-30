import copyBoard from './copyBoard';
import getChangedSquareCoords from './getChangedSquareCoords';

const shootAndGetNextHit = (computerPlayer) => {
  let hit = false;
  let hitSquareCoords = null;

  while (hit === false) {
    // Just a reference to make code a bit more readable
    let currentHitsBoard = computerPlayer.opponent.gameboard.hitsBoard;

    let boardBeforeAttack = copyBoard(currentHitsBoard);

    computerPlayer.makeTurn();

    const changedSquareCoords = getChangedSquareCoords(
      boardBeforeAttack,
      currentHitsBoard,
    );

    const changedSquare =
      currentHitsBoard[changedSquareCoords[0]][changedSquareCoords[1]];

    if (changedSquare === 'hit') {
      hit = true;
      hitSquareCoords = changedSquareCoords;
    }
  }

  return hitSquareCoords;
};

export default shootAndGetNextHit;
