import OpponentBoard from './components/OpponentBoard/OpponentBoard';
import PlayerBoard from './components/PlayerBoard/PlayerBoard';
import PlayerShipyard from './components/PlayerShipyard/PlayerShipyard';
import ShipyardShip from './components/PlayerShipyard/ShipyardShip';
import getLiftedShip from './helpers/getLiftedShip';
import getShipStartingCoords from './helpers/getShipStartingCoords';
import placeDraggableShip from './helpers/placeDraggableShip';
import styleBoardShip from './helpers/styleBoardShip';

const GameRenderer = (player, opponent, clickSquareCallback) => {
  const renderer = {};

  renderer.renderOpponentBoard = function () {
    const container = document.querySelector('.opponent-board-container');
    container.textContent = '';

    const overlay = document.createElement('div');
    overlay.classList.add('opponent-overlay');

    const startGameButton = document.createElement('button');
    startGameButton.classList.add('start-game-button');
    startGameButton.textContent = 'Start game';

    overlay.appendChild(startGameButton);
    container.appendChild(overlay);

    const opponentBoard = OpponentBoard(opponent, clickSquareCallback);

    container.appendChild(opponentBoard);
  };

  renderer.renderPlayerBoard = function () {
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
    shipyardContainer.appendChild(playerShipyard);
  };

  renderer.setUpDropEventListener = function () {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    window.addEventListener('drop', (e) => {
      e.preventDefault();

      const liftedShip = getLiftedShip(player);

      // Meaning user tried to put from shipyard not onto the board
      if (!liftedShip) {
        player.sortShipyard();
        this.renderShipyard();
        return;
      }

      // Otherwise meaning ship was taken from the board

      if (!e.target.closest('.player-board-container')) {
        player.gameboard.deleteShip(liftedShip);

        document.querySelectorAll('.dragging').forEach((element) => {
          element.classList.remove('dragging');
        });

        player.sortShipyard();
        this.renderShipyard();
      }

      if (e.target.closest('.allied-ship')) {
        // return it to where it was if from gameboard
        const liftedShipInitialCoords = getShipStartingCoords(
          player.gameboard,
          liftedShip,
        );

        placeDraggableShip(player, liftedShip, liftedShipInitialCoords);
      }
    });

    document
      .querySelector('.board.player-board')
      .addEventListener('shipTakenFromShipyard', (e) => {
        renderer.renderShipyard();
      });
  };

  renderer.hideShipyardShips = function () {
    const shipyardContainer = document.querySelector(
      '.player-shipyard-container',
    );
    shipyardContainer.textContent = '';

    const draggableShips = document.querySelectorAll(
      '.player-board .shipyard-ship',
    );
    draggableShips.forEach((shipEl) => {
      shipEl.remove();
    });
  };

  renderer.startPlacingPhase = function () {
    document
      .querySelector('.opponent-board-container')
      .classList.add('disabled');

    document
      .querySelector('.start-game-button')
      .addEventListener('click', (e) => {
        if (player.shipyard.length === 0) {
          renderer.startGame();
        }
      });

    document.querySelector('h1').textContent = 'Place your ships';
  };

  renderer.startGame = function () {
    document
      .querySelector('.opponent-board-container')
      .classList.remove('disabled');

    document.querySelector('h1').textContent = 'Your turn';

    this.renderPlayerBoard();
    this.hideShipyardShips();
    this.renderOpponentBoard();
  };

  return renderer;
};

export default GameRenderer;
