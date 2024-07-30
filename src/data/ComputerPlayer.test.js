import ComputerPlayer from './ComputerPlayer';
import Player from './Player';
import Ship from './Ship';
import areCrossAdjacent from '../helpers/areCrossAdjacent';
import squareIsShip from '../helpers/squareIsShip';
import squareAlreadyHit from '../helpers/squareAlreadyHit';
import copyBoard from '../helpers/copyBoard';
import getChangedSquareCoords from '../helpers/getChangedSquareCoords';
import shootAndGetNextHit from '../helpers/shootAndGetNextHit';
import getNewPossibleHitCoordsAfterMultipleHits from '../helpers/getNewPossibleHitCoordsAfterMultipleHits';
import areEqualCoords from '../helpers/areEqualCoords';

test('Shoots', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  const opponentHitsBoard = computerPlayer.opponent.gameboard.hitsBoard;
  const boardBeforeAttack = copyBoard(opponentHitsBoard);

  computerPlayer.makeTurn();

  const changedSquare = getChangedSquareCoords(
    boardBeforeAttack,
    opponentHitsBoard,
  );

  expect(changedSquare).not.toBeNull();
});

test('Does not shoot at the same square twice', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  // Shoot every square
  for (let i = 0; i < computerPlayer.gameboard.board.length ** 2; i++) {
    computerPlayer.makeTurn();
  }

  for (let i = 0; i < computerPlayer.gameboard.board.length; i++) {
    for (let j = 0; j < computerPlayer.gameboard.board.length; j++) {
      expect(computerPlayer.opponent.gameboard.hitsBoard[i][j]).not.toBeNull();
    }
  }
});

test('Tries one of adjacent squares after hit', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  const longShip = Ship(4);

  opponent.gameboard.placeShip(longShip, [3, 3], 'ttb');
  opponent.gameboard.placeShip(longShip, [3, 5], 'ttb');
  opponent.gameboard.placeShip(longShip, [3, 7], 'ttb');

  const opponentHitsBoard = computerPlayer.opponent.gameboard.hitsBoard;

  const firstHitSquareCoords = shootAndGetNextHit(computerPlayer);
  const boardAfterFirstHit = copyBoard(opponentHitsBoard);

  computerPlayer.makeTurn();

  let afterHitAttackCoords = getChangedSquareCoords(
    boardAfterFirstHit,
    opponentHitsBoard,
  );

  expect(areCrossAdjacent(firstHitSquareCoords, afterHitAttackCoords)).toBe(
    true,
  );
});

test('Hits in a row when hit the same ship twice', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  const longShip = Ship(4);

  opponent.gameboard.placeShip(longShip, [0, 0], 'ltr');
  opponent.gameboard.placeShip(longShip, [3, 5], 'ttb');

  const opponentHitsBoard = computerPlayer.opponent.gameboard.hitsBoard;

  const firstHitSquareCoords = shootAndGetNextHit(computerPlayer);
  const secondHitSquareCoords = shootAndGetNextHit(computerPlayer);

  const hitsCoords = [firstHitSquareCoords, secondHitSquareCoords];

  const newPossibleHitCoords =
    getNewPossibleHitCoordsAfterMultipleHits(hitsCoords);

  const boardAfterSecondHit = copyBoard(opponentHitsBoard);

  computerPlayer.makeTurn();

  const afterSecondHitAttackCoords = getChangedSquareCoords(
    boardAfterSecondHit,
    opponentHitsBoard,
  );

  expect(afterSecondHitAttackCoords).not.toBeNull();

  expect(
    newPossibleHitCoords.some((coords) =>
      areEqualCoords(coords, afterSecondHitAttackCoords),
    ),
  ).toBe(true);
});

test('Hits in a row when already hit the same ship three times', () => {
  const opponent = Player();
  const computerPlayer = ComputerPlayer(opponent);

  const longShip = Ship(4);

  opponent.gameboard.placeShip(longShip, [0, 0], 'ltr');
  opponent.gameboard.placeShip(longShip, [3, 5], 'ttb');

  const opponentHitsBoard = computerPlayer.opponent.gameboard.hitsBoard;

  const firstHitSquareCoords = shootAndGetNextHit(computerPlayer);
  const secondHitSquareCoords = shootAndGetNextHit(computerPlayer);
  const thirdHitSquareCoords = shootAndGetNextHit(computerPlayer);

  const hitsCoords = [
    firstHitSquareCoords,
    secondHitSquareCoords,
    thirdHitSquareCoords,
  ];

  const newPossibleHitCoords =
    getNewPossibleHitCoordsAfterMultipleHits(hitsCoords);

  const boardAfterThirdHit = copyBoard(opponentHitsBoard);

  computerPlayer.makeTurn();

  const afterThirdHitAttackCoords = getChangedSquareCoords(
    boardAfterThirdHit,
    opponentHitsBoard,
  );

  expect(afterThirdHitAttackCoords).not.toBeNull();

  expect(
    newPossibleHitCoords.some((coords) =>
      areEqualCoords(coords, afterThirdHitAttackCoords),
    ),
  ).toBe(true);
});
