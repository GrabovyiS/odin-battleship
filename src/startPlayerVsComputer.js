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
  computerPlayer.gameboard.placeShip(bigShip2, [6, 2], 'ttb');
  computerPlayer.gameboard.placeShip(mediumShip2, [4, 6], 'ltr');
  computerPlayer.gameboard.placeShip(smallShip2, [9, 9]);

  const onClickSquare = function (event) {
    computerPlayer.gameboard.receiveAttack(event.target.coords);
    renderer.renderOpponentBoard();
    setTimeout(() => {
      computerPlayer.makeTurn();
      renderer.renderPlayerBoard();
    }, 250);
  };

  const renderer = GameRenderer(player, computerPlayer, onClickSquare);
  renderer.renderOpponentBoard();
  renderer.renderPlayerBoard();
  renderer.setUpDropEventListener();
  renderer.renderShipyard();

  renderer.startPlacingPhase();

  console.table(player.gameboard.board);
};

export default startPlayerVsComputer;
