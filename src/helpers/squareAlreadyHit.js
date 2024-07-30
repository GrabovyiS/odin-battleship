const squareAlreadyHit = (gameboard, coords) => {
  if (gameboard.hitsBoard[coords[0]][coords[1]] === null) {
    return false;
  }

  return true;
};

export default squareAlreadyHit;
