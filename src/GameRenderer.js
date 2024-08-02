import OpponentBoard from './components/OpponentBoard/OpponentBoard';
import PlayerBoard from './components/PlayerBoard/PlayerBoard';
import PlayerShipyard from './components/PlayerShipyard/PlayerShipyard';
import ShipyardShip from './components/PlayerShipyard/ShipyardShip';
import getLiftedShip from './helpers/getLiftedShip';
import getShipStartingCoords from './helpers/getShipStartingCoords';
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

      // get lifted up ship - it is not yet deleted from the gameboard and at the same time it is already in the shipyard
      const liftedShip = getLiftedShip(player);
      console.log(e.target);

      // meaning user tried to put from shipyard not onto the board
      // because if from shipyard than it does not exist on gameboard
      if (!liftedShip) {
        player.sortShipyard();
        this.renderShipyard();
        // same as doing nothing - just render shipyard
        return;
      }

      // If thrown into nothing
      if (!e.target.closest('.player-board-container')) {
        // thrown off the board
        player.gameboard.deleteShip(liftedShip);
        console.log('thrown off the board');

        document.querySelectorAll('.dragging').forEach((element) => {
          element.classList.remove('dragging');
        });

        // the ship is deleted from gameboard when it is lifted up by the mouse
        // it is temporarily added to the shipyard then also
        // if it is thrown from the board - it just keeps its place in shipyard so we re-render shipyard
        player.sortShipyard();
        this.renderShipyard();
      }

      if (e.target.closest('.allied-ship')) {
        const liftedShip = getLiftedShip(player);

        // return it to where it was if from gameboard
        // and delete it from shipyard because it is now only on the gameboard
        const liftedShipCoords = getShipStartingCoords(
          player.gameboard,
          liftedShip,
        );

        const returningShip = ShipyardShip(
          liftedShip,
          liftedShip.direction,
          player,
        );

        styleBoardShip(returningShip, liftedShipCoords, liftedShip.direction);

        const interactiveBoard = document.querySelector('.board.player-board');
        interactiveBoard.appendChild(returningShip);

        console.table(player.gameboard.board);
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
