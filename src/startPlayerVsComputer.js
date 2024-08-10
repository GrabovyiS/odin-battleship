import Player from './data/Player';
import ComputerPlayer from './data/ComputerPlayer';
import Ship from './data/Ship';

import GameRenderer from './GameRenderer';

const startPlayerVsComputer = () => {
  const player = Player();
  const computerPlayer = ComputerPlayer(player);

  const biggestShip2 = Ship(4);

  const bigShip2 = Ship(3);

  const mediumShip2 = Ship(2);

  const smallShip2 = Ship(1);

  computerPlayer.gameboard.placeShip(biggestShip2, [1, 1], 'ltr');
  computerPlayer.gameboard.placeShip(smallShip2, [9, 9]);

  const onClickSquare = function (event) {
    if (
      !(
        computerPlayer.gameboard.receiveAttack(event.target.coords) instanceof
        Error
      )
    ) {
      if (computerPlayer.gameboard.allSunk()) {
        renderer.showVictory();
        renderer.renderOpponentBoard();
        return;
      }

      renderer.renderOpponentBoard();
      renderer.showOpponentsTurn();
      setTimeout(() => {
        computerPlayer.makeTurn();
        renderer.renderPlayerBoard();

        if (player.gameboard.allSunk()) {
          renderer.showDefeat();
          return;
        }

        renderer.showPlayersTurn();
      }, 480);
    }
  };

  const renderer = GameRenderer(player, computerPlayer, onClickSquare);
  renderer.renderOpponentBoard();
  renderer.renderPlayerBoard();
  renderer.setUpDropEventListener();
  renderer.renderShipyard();

  renderer.startPlacingPhase();
  document
    .querySelector('.start-game-button')
    .addEventListener('click', (e) => {
      // if (player.shipyard.length === 0) {
      renderer.startGame();
      // }
    });
};

export default startPlayerVsComputer;
