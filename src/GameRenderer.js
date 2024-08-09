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

  renderer.startPlacingPhase = function () {
    console.log('start placing phase');
    // disable opponent board
    // display a start game button
    // create interactive board
    const playerBoardContainer = document.querySelector(
      '.player-board-container',
    );
    // const interactiveBoard = document.createElement('div');
    // interactiveBoard.classList.add('board', 'interactive-board');
    // playerBoardContainer.appendChild(interactiveBoard);
  };

  return renderer;
};

export default GameRenderer;
