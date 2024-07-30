const squareIsShip = (gameboard, coords) => {
  if (
    gameboard.board[coords[0]][coords[1]] !== null &&
    typeof gameboard.board[coords[0]][coords[1]] === 'object'
  ) {
    return true;
  }

  return false;
};

export default squareIsShip;
