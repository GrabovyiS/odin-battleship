import ComputerPlayer from './ComputerPlayer';
import Player from './Player';
import Ship from './Ship';
import areAdjacent from '../helpers/areAdjacent';

test('Shoots', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);
  computerPlayer.makeTurn();

  let oneSquareIsHit = false;

  for (const row of opponent.gameboard.hitsBoard) {
    for (const square of row) {
      if (square !== null) {
        oneSquareIsHit = true;
      }
    }
  }

  expect(oneSquareIsHit).toBe(true);
});

test('Does not shoot at the same square twice', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  // Shoot every square
  for (
    let i = 0;
    i <
    computerPlayer.gameboard.board.length *
      computerPlayer.gameboard.board.length;
    i++
  ) {
    expect(computerPlayer.makeTurn()).not.toBeInstanceOf(Error);
  }
});

test('Tries one of adjacent squares after hit', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  const longShip = Ship(4);

  opponent.gameboard.placeShip(longShip, [3, 3], 'ttb');
  opponent.gameboard.placeShip(longShip, [3, 5], 'ttb');
  opponent.gameboard.placeShip(longShip, [3, 7], 'ttb');

  let hit = false;
  let hitSquareCoords = null;
  while (hit === false) {
    computerPlayer.makeTurn();

    for (let i = 0; i < opponent.gameboard.hitsBoard.length; i++) {
      for (let j = 0; j < opponent.gameboard.hitsBoard.length; j++) {
        const square = opponent.gameboard.hitsBoard[i][j];
        if (square === 'hit') {
          hit = true;
          hitSquareCoords = [i, j];
        }
      }
    }
  }

  const boardAfterFirstHit = [];
  for (let i = 0; i < opponent.gameboard.board.length; i++) {
    boardAfterFirstHit.push(opponent.gameboard.hitsBoard[i].slice());
  }

  computerPlayer.makeTurn();
  let newlyHitSquareCoords = null;

  for (let i = 0; i < opponent.gameboard.hitsBoard.length; i++) {
    for (let j = 0; j < opponent.gameboard.hitsBoard.length; j++) {
      const newSquare = opponent.gameboard.hitsBoard[i][j];
      const oldSquare = boardAfterFirstHit[i][j];

      if (newSquare !== oldSquare) {
        newlyHitSquareCoords = [i, j];
      }
    }
  }

  expect(areAdjacent(hitSquareCoords, newlyHitSquareCoords)).toBe(true);
});
