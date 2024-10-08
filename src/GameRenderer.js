import OpponentBoard from './components/OpponentBoard/OpponentBoard';
import PlayerBoard from './components/PlayerBoard/PlayerBoard';
import PlayerShipyard from './components/PlayerShipyard/PlayerShipyard';
import getLiftedShip from './helpers/getLiftedShip';
import getShipStartingCoords from './helpers/getShipStartingCoords';
import placeDraggableShip from './helpers/placeDraggableShip';
import randomizePlacementWithDraggableShips from './helpers/randomizePlacementWithDraggableShips';

const GameRenderer = (player, opponent, clickSquareCallback) => {
  const renderer = {};

  renderer.renderOpponentBoard = function () {
    const container = document.querySelector('.opponent-board-container');
    container.textContent = '';

    container.classList.remove('paused', 'finished', 'disabled');

    const playAgainButton = document.querySelector('.play-again-button');

    playAgainButton.classList.remove('shown');
    playAgainButton.classList.add('hidden');

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

  renderer.resetPlacement = function () {
    player.resetShipyard();
    player.gameboard.resetBoard();
    this.renderShipyard();
    this.clearBoardFromDraggableShips();
  };

  renderer.renderPlayerBoard = function () {
    const container = document.querySelector('.player-board-container');
    container.textContent = '';

    const playerBoard = PlayerBoard(player);
    container.appendChild(playerBoard);

    const resetButton = document.querySelector('.reset-placement-button');
    resetButton.addEventListener('click', () => {
      this.resetPlacement();
    });

    const randomizeButton = document.querySelector(
      '.randomize-placement-button',
    );
    randomizeButton.addEventListener('click', () => {
      this.resetPlacement();

      randomizePlacementWithDraggableShips(player);

      this.renderShipyard();
    });
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

        const liftedShipIndex = player.shipyard.findIndex(
          (ship) => ship === liftedShip,
        );
        player.shipyard.splice(liftedShipIndex, 1);

        liftedShip.direction = 'ltr';
        player.shipyard.push(liftedShip);

        document.querySelectorAll('.dragging').forEach((element) => {
          element.classList.remove('dragging');
        });

        player.sortShipyard();
        this.renderShipyard();
      }

      if (e.target.closest('.allied-ship')) {
        const liftedShipIndex = player.shipyard.findIndex(
          (ship) => ship === liftedShip,
        );
        player.shipyard.splice(liftedShipIndex, 1);

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

  renderer.clearBoardFromDraggableShips = function () {
    const draggableShips = document.querySelectorAll(
      '.player-board .shipyard-ship',
    );
    draggableShips.forEach((shipEl) => {
      shipEl.remove();
    });
  };

  renderer.hideShipyardShips = function () {
    const shipyardContainer = document.querySelector(
      '.player-shipyard-container',
    );
    shipyardContainer.textContent = '';

    this.clearBoardFromDraggableShips();
  };

  renderer.startPlacingPhase = function () {
    document
      .querySelector('.opponent-board-container')
      .classList.add('disabled');

    document.querySelector('h1').textContent =
      'Place your ships (click to turn)';
    document.querySelector('.reset-placement-button').style.display = 'block';
    document.querySelector('.randomize-placement-button').style.display =
      'block';
  };

  renderer.startGame = function () {
    document
      .querySelector('.opponent-board-container')
      .classList.remove('disabled');

    document.querySelector('h1').textContent = 'Your turn';
    document.querySelector('.reset-placement-button').style.display = 'none';
    document.querySelector('.randomize-placement-button').style.display =
      'none';

    this.renderPlayerBoard();
    this.hideShipyardShips();
    this.renderOpponentBoard();
  };

  renderer.showPlayersTurn = function () {
    document.querySelector('h1').textContent = 'Your turn';
    document
      .querySelector('.opponent-board-container')
      .classList.remove('paused');
  };

  renderer.showOpponentsTurn = function () {
    document.querySelector('h1').textContent = 'Opponents turn';
    document.querySelector('.opponent-board-container').classList.add('paused');
  };

  renderer.showEndOfGame = function () {
    const playAgainButton = document.querySelector('.play-again-button');
    playAgainButton.classList.add('shown');
    playAgainButton.classList.remove('hidden');
  };

  renderer.showVictory = function () {
    this.showEndOfGame();
    document.querySelector('h1').textContent = 'Victory!';
    document
      .querySelector('.opponent-board-container')
      .classList.add('finished');
  };

  renderer.showDefeat = function () {
    this.showEndOfGame();
    document.querySelector('h1').textContent = 'Defeat';
    document
      .querySelector('.opponent-board-container')
      .classList.add('finished');
  };

  return renderer;
};

export default GameRenderer;
