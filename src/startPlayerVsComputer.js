import Player from './data/Player';
import ComputerPlayer from './data/ComputerPlayer';

import GameRenderer from './GameRenderer';

const startPlayerVsComputer = () => {
  const player = Player();

  const computerPlayer = ComputerPlayer(player);
  computerPlayer.populateGameboardRandomly();

  const makeComputerTurn = () => {
    let computerAttackResult = computerPlayer.makeTurn();

    setTimeout(() => {
      renderer.renderPlayerBoard();

      if (player.gameboard.allSunk()) {
        renderer.showDefeat();
        return;
      }

      if (computerAttackResult === 'hit') {
        makeComputerTurn();
      } else {
        renderer.showPlayersTurn();
      }
    }, 480);
  };

  const onClickSquare = function (event) {
    const attackResult = computerPlayer.gameboard.receiveAttack(
      event.target.coords,
    );
    if (!(attackResult instanceof Error)) {
      if (computerPlayer.gameboard.allSunk()) {
        renderer.showVictory();
        renderer.renderOpponentBoard();
        return;
      }

      renderer.renderOpponentBoard();

      if (attackResult === 'hit') {
        return;
      }

      renderer.showOpponentsTurn();
      makeComputerTurn();
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
      if (player.shipyard.length === 0) {
        renderer.startGame();
      }
    });
};

export default startPlayerVsComputer;
