import OpponentBoard from './components/OpponentBoard/OpponentBoard';
import PlayerBoard from './components/PlayerBoard/PlayerBoard';
import PlayerShipyard from './components/PlayerShipyard/PlayerShipyard';
import Ship from './data/Ship';

const GameRenderer = (player, opponent, clickSquareCallback) => {
  const renderer = {};

  renderer.renderOpponentBoard = function () {
    const container = document.querySelector('.opponent-board-container');
    container.textContent = '';

    const opponentBoard = OpponentBoard(opponent, clickSquareCallback);

    container.appendChild(opponentBoard);
  };

  renderer.renderPlayerBoard = function () {
    console.log('shooting at player!');
    const container = document.querySelector('.player-board-container');
    container.textContent = '';
    const playerBoard = PlayerBoard(player);
    container.appendChild(playerBoard);
  };

  renderer.renderShipyard = function () {
    const shipyardContainer = document.querySelector(
      '.player-shipyard-container',
    );
    shipyardContainer.textContent = '';

    const playerShipyard = PlayerShipyard(player);
    console.log(
      'rendering shipyard',
      { playerShipyard },
      { shipyardContainer },
    );
    shipyardContainer.appendChild(playerShipyard);
  };

  renderer.setUpDropEventListener = function () {};

  renderer.hideShipyard = function () {
    const shipyardContainer = document.querySelector(
      '.player-shipyard-container',
    );
    shipyardContainer.textContent = '';

    const playerBoard = document.querySelector('.player-board-container');
    for (const square of playerBoard.childNodes) {
      //
    }
  };

  return renderer;
};

export default GameRenderer;
