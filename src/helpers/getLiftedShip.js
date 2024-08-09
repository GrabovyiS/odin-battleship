// If the ship is lifted from gameboard, not form shipyard, then
// it is in the shipyard and in the gameboard at the moment of dragstart

const getLiftedShip = (player) => {
  for (let i = 0; i < player.gameboard.board.length; i++) {
    for (let j = 0; j < player.gameboard.board.length; j++) {
      if (
        player.shipyard.find((ship) => ship === player.gameboard.board[i][j])
      ) {
        return player.gameboard.board[i][j];
      }
    }
  }

  return null;
};

export default getLiftedShip;
