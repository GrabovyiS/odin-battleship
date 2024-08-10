import forEachShipSquare from './forEachShipCoord';
import Gameboard from '../data/Gameboard';
import Ship from '../data/Ship';

// Omitted testing for things like 'if gameboard is not a gameboard'
test('Works if one or more callbacks are not provided', () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [1, 1], 'ltr');

  let callbackCalled = 0;
  forEachShipSquare(
    gameboard,
    ship,
    (squareCoords) => {
      callbackCalled++;
    },
    null,
  );

  expect(callbackCalled).toBe(4);
});

test('onexoneCallback gets called on 1x1 Ship', () => {
  const gameboard = Gameboard();
  const ship = Ship(1);
  gameboard.placeShip(ship, [1, 1]);

  let callbackCalled = false;
  forEachShipSquare(
    gameboard,
    ship,
    () => {},
    () => {},
    (squareCoords) => {
      callbackCalled = true;
    },
  );

  expect(callbackCalled).toBe(true);
});

test('ttbCallback gets called on ttb Ship', () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [1, 1], 'ttb');

  let callbackCalled = 0;
  forEachShipSquare(
    gameboard,
    ship,
    () => {},
    (squareCoords) => {
      callbackCalled++;
    },
    () => {},
  );

  expect(callbackCalled).toBe(4);
});

test('ltrCallback gets called on ltr Ship', () => {
  const gameboard = Gameboard();
  const ship = Ship(4);
  gameboard.placeShip(ship, [1, 1], 'ltr');

  let callbackCalled = 0;
  forEachShipSquare(
    gameboard,
    ship,
    (squareCoords) => {
      callbackCalled++;
    },
    () => {},
    () => {},
  );

  expect(callbackCalled).toBe(4);
});
