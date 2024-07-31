import forEachShipCoord from './forEachShipCoord';
import styleSunkSquareLtr from './styleSunkSquareLtr';
import styleSunkSquareTtb from './styleSunkSquareTtb';
import styleSunkSquareOnexone from './styleSunkSquareOnexone';

const styleSunkShips = (boardContaier, gameboard) => {
  const squares = boardContaier.childNodes;
  for (const square of squares) {
    const [i, j] = square.coords;
    const currentSquareState = gameboard.hitsBoard[i][j];

    if (currentSquareState === 'hit' && gameboard.board[i][j].isSunk()) {
      const ship = gameboard.board[i][j];
      forEachShipCoord(
        gameboard,
        ship,
        (shipSquareCoords, shipPosition) => {
          styleSunkSquareLtr(boardContaier, shipSquareCoords, shipPosition);
        },
        (shipSquareCoords, shipPosition) => {
          styleSunkSquareTtb(boardContaier, shipSquareCoords, shipPosition);
        },
        (shipSquareCoords) => {
          styleSunkSquareOnexone(boardContaier, shipSquareCoords);
        },
      );
    }
  }
};

export default styleSunkShips;
