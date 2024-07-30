import coordsOutOfBoardBounds from './coordsOutOfBoardBounds';
import squareAlreadyHit from './squareAlreadyHit';

const getUnhitSquareCoords = (gameboard, inputSetOfSquareCoords) => {
  let hitCoords;
  let setOfSquareCoords;

  if (!inputSetOfSquareCoords) {
    setOfSquareCoords = [];
    for (let i = 0; i < gameboard.board.length; i++) {
      for (let j = 0; j < gameboard.board.length; j++) {
        setOfSquareCoords.push([i, j]);
      }
    }
  } else {
    setOfSquareCoords = inputSetOfSquareCoords;
  }

  while (true) {
    const index = Math.floor(Math.random() * setOfSquareCoords.length);

    if (coordsOutOfBoardBounds(setOfSquareCoords[index])) {
      continue;
    }

    hitCoords = [setOfSquareCoords[index][0], setOfSquareCoords[index][1]];

    if (!squareAlreadyHit(gameboard, hitCoords)) {
      return hitCoords;
    }
  }
};

export default getUnhitSquareCoords;
