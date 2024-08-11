import Gameboard from './Gameboard';
import Ship from './Ship';

describe('Placing ships', () => {
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
});

test('Deletes a ship', () => {
  const gameboard = Gameboard();
  const ship = Ship(2);
  gameboard.placeShip(ship, [0, 0], 'ltr');
  gameboard.deleteShip(ship);

  expect(gameboard.board[0][0] === null && gameboard.board[0][1] === null).toBe(
    true,
  );
});

describe('Receiving attack', () => {
  test('Record missed attack', () => {
    const gameboard = Gameboard();

    gameboard.receiveAttack([0, 0]);
    expect(gameboard.hitsBoard[0][0]).toBe('missed');
  });

  test('Record a hit on a ship', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    gameboard.placeShip(ship, [0, 0], 'ttb');

    gameboard.receiveAttack([0, 0]);
    expect(ship.hits).toBe(1);
  });

  test('Record a hit on the hits board', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    gameboard.placeShip(ship, [0, 0], 'ttb');

    gameboard.receiveAttack([0, 0]);
    expect(gameboard.hitsBoard[0][0]).toBe('hit');
  });

  test('Returns an error when trying to attack already hit square', () => {
    const gameboard = Gameboard();
    const ship = Ship(3);
    gameboard.placeShip(ship, [0, 0], 'ttb');

    gameboard.receiveAttack([0, 0]);
    expect(gameboard.receiveAttack([0, 0])).toBeInstanceOf(Error);
  });

  test('Sets adjacent squares to "miss" after sinking a ship', () => {
    const gameboard = Gameboard();
    const ship1 = Ship(2);
    gameboard.placeShip(ship1, [1, 1], 'ltr');

    gameboard.receiveAttack([1, 1]);
    gameboard.receiveAttack([1, 2]);

    expect(gameboard.hitsBoard[0][0]).toBe('missed');
    expect(gameboard.hitsBoard[0][1]).toBe('missed');
    expect(gameboard.hitsBoard[0][2]).toBe('missed');
    expect(gameboard.hitsBoard[0][3]).toBe('missed');

    expect(gameboard.hitsBoard[2][0]).toBe('missed');
    expect(gameboard.hitsBoard[2][1]).toBe('missed');
    expect(gameboard.hitsBoard[2][2]).toBe('missed');
    expect(gameboard.hitsBoard[2][3]).toBe('missed');

    expect(gameboard.hitsBoard[1][0]).toBe('missed');
    expect(gameboard.hitsBoard[1][3]).toBe('missed');

    const ship2 = Ship(1);
    gameboard.placeShip(ship2, [9, 9], 'ltr');

    gameboard.receiveAttack([9, 9]);
    expect(gameboard.hitsBoard[8][9]).toBe('missed');
    expect(gameboard.hitsBoard[9][8]).toBe('missed');
    expect(gameboard.hitsBoard[8][8]).toBe('missed');

    expect(gameboard.hitsBoard[7][7]).toBeNull();
    expect(gameboard.hitsBoard[0][4]).toBeNull();
    expect(gameboard.hitsBoard[3][1]).toBeNull();
  });
});

describe('All ships sunk', () => {
  const gameboard = Gameboard();
  const ship1 = Ship(1);
  const ship2 = Ship(2);

  gameboard.placeShip(ship1, [0, 0]);
  gameboard.placeShip(ship2, [0, 2], 'ttb');

  gameboard.receiveAttack([0, 0]);

  test('Report correctly when all ships are sunk', () => {
    expect(gameboard.allSunk()).toBe(false);
  });
  test('Report correctly when not all ships are sunk', () => {
    gameboard.receiveAttack([0, 2]);
    gameboard.receiveAttack([1, 2]);

    expect(gameboard.allSunk()).toBe(true);
  });
});
