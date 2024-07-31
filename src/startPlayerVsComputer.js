import Player from './data/Player';
import ComputerPlayer from './data/ComputerPlayer';
import Ship from './data/Ship';

import GameRenderer from './GameRenderer';

const startPlayerVsComputer = () => {
  const player = Player();
  const computerPlayer = ComputerPlayer(player);

  const biggestShip1 = Ship(4);
  const biggestShip2 = Ship(4);

  const bigShip1 = Ship(3);
  const bigShip2 = Ship(3);

  const mediumShip1 = Ship(2);
  const mediumShip2 = Ship(2);

  const smallShip1 = Ship(1);
  const smallShip2 = Ship(1);

  player.gameboard.placeShip(biggestShip1, [1, 1], 'ltr');
  player.gameboard.placeShip(bigShip1, [6, 2], 'ttb');
  player.gameboard.placeShip(mediumShip1, [4, 6], 'ltr');
  player.gameboard.placeShip(smallShip1, [9, 9]);

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

  console.table(player.gameboard.board);
};

export default startPlayerVsComputer;
