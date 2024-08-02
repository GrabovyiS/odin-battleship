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
};

export default getLiftedShip;
