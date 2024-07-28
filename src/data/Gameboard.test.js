import Gameboard from './Gameboard';
import Ship from './Ship';

test('Place a 1x1 ship', () => {
  const gameboard = Gameboard();

  const ship1 = Ship(1);
  gameboard.placeShip(ship1, [0, 0]);
  expect(gameboard.board[0][0]).toBe(ship1);

  const ship2 = Ship(1);
  gameboard.placeShip(ship2, [0, 9]);
  expect(gameboard.board[0][9]).toBe(ship2);
});

test('Place a longer ship', () => {
  const gameboard = Gameboard();

  const ship1 = Ship(2);
  gameboard.placeShip(ship1, [0, 0], 'ltr');
  expect(
    gameboard.board[0][0] === ship1 && gameboard.board[0][1] === ship1,
  ).toBeTruthy();

  const ship2 = Ship(3);
  gameboard.placeShip(ship2, [2, 0], 'ttb');
  expect(
    gameboard.board[2][0] === ship2 &&
      gameboard.board[3][0] === ship2 &&
      gameboard.board[4][0] === ship2,
  ).toBeTruthy();
});

test('Return an error with starting coordinates outside of the board', () => {
  const gameboard = Gameboard();

  const ship1 = Ship(1);
  expect(gameboard.placeShip(ship1, [10, 10])).toBeInstanceOf(Error);

  const ship2 = Ship(3);
  expect(gameboard.placeShip(ship2, [-1, 1])).toBeInstanceOf(Error);
});

test("Return an error when a ship can't fit on the board given certain coordinates and direction", () => {
  const gameboard = Gameboard();

  const ship1 = Ship(2);
  expect(gameboard.placeShip(ship1, [0, 9], 'ltr')).toBeInstanceOf(Error);

  const ship2 = Ship(3);
  expect(gameboard.placeShip(ship2, [8, 5], 'ttb')).toBeInstanceOf(Error);
});

test('Return an error when a newly placed ship would collide with another ship', () => {
  const gameboard = Gameboard();

  const ship1 = Ship(2);
  gameboard.placeShip(ship1, [0, 0], 'ttb');

  const ship2 = Ship(2);
  expect(gameboard.placeShip(ship2, [1, 0], 'ltr')).toBeInstanceOf(Error);

  const ship3 = Ship(2);
  gameboard.placeShip(ship3, [8, 9], 'ttb');

  const ship4 = Ship(3);
  expect(gameboard.placeShip(ship4, [9, 7], 'ltr')).toBeInstanceOf(Error);
});

test('Return an error when a newly placed ship is adjacent to another ship', () => {
  const gameboard = Gameboard();

  const ship1 = Ship(2);
  gameboard.placeShip(ship1, [0, 0], 'ttb');

  const ship2 = Ship(2);
  expect(gameboard.placeShip(ship2, [1, 1], 'ltr')).toBeInstanceOf(Error);
});
