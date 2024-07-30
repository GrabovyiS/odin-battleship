import ComputerPlayer from './ComputerPlayer';
import Player from './Player';
import Ship from './Ship';
import areCrossAdjacent from '../helpers/areCrossAdjacent';
import squareIsShip from '../helpers/squareIsShip';
import squareAlreadyHit from '../helpers/squareAlreadyHit';
import copyBoard from '../helpers/copyBoard';
import getChangedSquareCoords from '../helpers/getChangedSquareCoords';
import shootAndGetNextHit from '../helpers/shootAndGetNextHit';

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

// test('Hits in a row when hit the same ship twice', () => {
//   const opponent = Player();
//   const computerPlayer = ComputerPlayer(opponent);

//   const longShip = Ship(4);

//   opponent.gameboard.placeShip(longShip, [3, 3], 'ttb');
//   opponent.gameboard.placeShip(longShip, [3, 5], 'ttb');
//   opponent.gameboard.placeShip(longShip, [3, 7], 'ttb');

//   let hit = false;
//   let hitSquareCoords = null;
//   while (hit === false) {
//     computerPlayer.makeTurn();

//     for (let i = 0; i < opponent.gameboard.hitsBoard.length; i++) {
//       for (let j = 0; j < opponent.gameboard.hitsBoard.length; j++) {
//         const square = opponent.gameboard.hitsBoard[i][j];
//         if (square === 'hit') {
//           hit = true;
//           hitSquareCoords = [i, j];
//         }
//       }
//     }
//   }

//   const boardAfterFirstHit = [];
//   for (let i = 0; i < opponent.gameboard.board.length; i++) {
//     boardAfterFirstHit.push(opponent.gameboard.hitsBoard[i].slice());
//   }

//   let newlyHitSquareCoords = null;
//   let newlyHitSquare = null;
//   while (newlyHitSquare !== 'hit') {
//     computerPlayer.makeTurn();

//     for (let i = 0; i < opponent.gameboard.hitsBoard.length; i++) {
//       for (let j = 0; j < opponent.gameboard.hitsBoard.length; j++) {
//         const newSquare = opponent.gameboard.hitsBoard[i][j];
//         const oldSquare = boardAfterFirstHit[i][j];

//         if (newSquare !== oldSquare) {
//           newlyHitSquareCoords = [i, j];
//           newlyHitSquare = newSquare;
//         }
//       }
//     }
//   }

//   console.log('after second hit:');
//   console.table(opponent.gameboard.hitsBoard);

//   const hitCoords = [hitSquareCoords, newlyHitSquareCoords];

//   let newPossibleHitCoords = [];

//   if (hitCoords[0][0] - hitCoords[1][0] === 0) {
//     // direction is X
//     // figure out the most left and most right hit
//     hitCoords.sort((coords1, coords2) => (coords1[0] < coords2[0] ? -1 : 1));
//     const mostLeft = hitCoords[0];
//     const mostRight = hitCoords[0];

//     const lefter = [mostLeft[0], mostLeft[1] - 1];
//     const righter = [mostLeft[0], mostLeft[1] + 1];

//     newPossibleHitCoords.push(lefter, righter);
//   } else if (hitCoords[0][1] - hitCoords[1][1] === 0) {
//     // direction is y
//     hitCoords.sort((coords1, coords2) => (coords1[1] < coords2[1] ? -1 : 1));
//     const mostTop = hitCoords[0];
//     const mostBottom = hitCoords[0];

//     const topper = [mostTop[0] - 1, mostTop[1]];
//     const bottomer = [mostBottom[0] + 1, mostBottom[1]];

//     newPossibleHitCoords.push(topper, bottomer);
//   }

//   console.log('possible coords to hit after second hit', newPossibleHitCoords);

//   let thirdHitSquare = null;
//   let thirdHitSquareCoords = null;
//   while (newlyHitSquare !== 'hit') {
//     computerPlayer.makeTurn();

//     for (let i = 0; i < opponent.gameboard.hitsBoard.length; i++) {
//       for (let j = 0; j < opponent.gameboard.hitsBoard.length; j++) {
//         const newSquare = opponent.gameboard.hitsBoard[i][j];
//         const oldSquare = boardAfterFirstHit[i][j];

//         if (newSquare !== oldSquare) {
//           thirdHitSquareCoords = [i, j];
//           thirdHitSquare = newSquare;
//         }
//       }
//     }
//   }

//   // console.table(opponent.gameboard.hitsBoard);

//   expect(areAdjacent(hitSquareCoords, newlyHitSquareCoords)).toBe(true);
// });
