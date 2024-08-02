const getShipStartingCoords = (gameboard, ship) => {
  if (!Object.prototype.hasOwnProperty.call(gameboard, 'board')) {
    return new Error('Must provide a proper gameboard to get coordinates');
  }

  for (let i = 0; i < gameboard.board.length; i++) {
    for (let j = 0; j < gameboard.board.length; j++) {
      // We traverse from left to right, from top to bottom
      // Starting coordinate is always most and most left coordinate of the ship
      if (gameboard.board[i][j] === ship) {
        return [i, j];
      }
    }
  }

  return null;
};

export default getShipStartingCoords;
