import BOARD_SIZE from '../../data/BOARD_SIZE';
import styleSunkShips from '../../helpers/styleSunkShips';

const OpponentBoard = (player, clickSquareCallback) => {
  const opponentBoardContainer = document.createElement('div');
  opponentBoardContainer.classList.add('board');
  opponentBoardContainer.classList.add('opponent-board');

  console.log('re-render');

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      const square = document.createElement('div');
      square.classList.add(`i_${i}_j:_${j}`);
      square.classList.add('square');
      opponentBoardContainer.appendChild(square);
      square.coords = [i, j];

      square.addEventListener('click', clickSquareCallback);

      const currentSquareState = player.gameboard.hitsBoard[i][j];

      if (currentSquareState === null) {
        square.classList.add('unhit-square');
      } else if (currentSquareState === 'missed') {
        square.classList.add('missed-square');
      } else if (currentSquareState === 'hit') {
        square.classList.add('hit-square');
      }
    }
  }

  styleSunkShips(opponentBoardContainer, player.gameboard);

  return opponentBoardContainer;
};

export default OpponentBoard;
