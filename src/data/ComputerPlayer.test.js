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
  console.log('After first hit:');
  console.table(opponentHitsBoard);
  const secondHitSquareCoords = shootAndGetNextHit(computerPlayer);
  console.log('After second hit:');
  console.table(opponentHitsBoard);

  const hitCoords = [firstHitSquareCoords, secondHitSquareCoords];

  const newPossibleHitCoords =
    getNewPossibleHitCoordsAfterMultipleHits(hitCoords);

  const boardAfterSecondHit = copyBoard(opponentHitsBoard);

  computerPlayer.makeTurn();

  const afterSecondHitAttackCoords = getChangedSquareCoords(
    boardAfterSecondHit,
    opponentHitsBoard,
  );

  console.table(opponentHitsBoard);
  console.log({ newPossibleHitCoords });
  console.log({ afterSecondHitAttackCoords });
  // doesnt work yet and it is fine, check if aftersecondhitattackcoords are in the new possible coords
  // get a helper function for checking coords equality

  expect(
    newPossibleHitCoords.some((coords) =>
      areEqualCoords(coords, afterSecondHitAttackCoords),
    ),
  ).toBe(true);
});
