import forEachAdjacentCoord from './forEachAdjacentCoord';
import forEachShipCoord from './forEachShipCoord';

const setHitsAroundSunkShip = (gameboard, ship) => {
  const adjacentSquareCallback = (squareCoords) => {
    const squareValue = gameboard.hitsBoard[squareCoords[0]][squareCoords[1]];
    if (squareValue === null) {
      gameboard.hitsBoard[squareCoords[0]][squareCoords[1]] = 'missed';
    }
  };

  const shipCoordCallback = (shipCoord) => {
    forEachAdjacentCoord(
      gameboard.hitsBoard,
      shipCoord,
      adjacentSquareCallback,
    );
  };

  forEachShipCoord(
    gameboard,
    ship,
    shipCoordCallback,
    shipCoordCallback,
    shipCoordCallback,
  );
  // for each ship coord
  // for each adjacent square
  // process square:
  // if square is null
  // set it to missed
};

export default setHitsAroundSunkShip;
