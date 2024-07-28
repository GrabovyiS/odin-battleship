import Ship from './Ship';

test('Ship gets hit', () => {
  const ship = Ship(4);

  ship.hit();
  ship.hit();

  expect(ship.hits).toBe(2);
});

test('Ship does not sink immediately', () => {
  const ship = Ship(2);
  expect(ship.isSunk()).toBe(false);
});

test('Ship does not sink too early', () => {
  const ship = Ship(2);
  ship.hit();

  expect(ship.isSunk()).toBe(false);
});

test('1x1 ship sinks correctly', () => {
  const ship = Ship(1);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

test('Bigger ship sinks correctly', () => {
  const ship = Ship(2);

  ship.hit();
  ship.hit();

  expect(ship.isSunk()).toBe(true);
});
