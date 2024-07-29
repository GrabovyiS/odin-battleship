const BOARD_SIZE = 10;

const Gameboard = () => {
  const gameboard = {};

  gameboard.board = [];
  for (let i = 0; i < BOARD_SIZE; i++) {
    gameboard.board.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      gameboard.board[i].push(null);
    }
  }

  gameboard.hitsBoard = [];
  for (let i = 0; i < gameboard.board.length; i++) {
    gameboard.hitsBoard.push(gameboard.board[i].slice());
  }

  gameboard.shipsInBattle = [];

  gameboard.resetBoard = function () {
    this.shipsInBattle = [];

    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        gameboard.board[i][j] = null;
        gameboard.hitsBoard[i][j] = null;
      }
    }
  };

  gameboard.placeShip = function (ship, startingCoords, direction) {
    if (
      startingCoords[0] > this.board.length - 1 ||
      startingCoords[0] < 0 ||
      startingCoords[1] > this.board.length - 1 ||
      startingCoords[1] < 0
    ) {
      return new Error('Wrong starting coordinates');
    }

    const ttbEndOfShipCoordinate = startingCoords[0] + ship.length - 1;
    const ltrEndOfShipCoordinate = startingCoords[1] + ship.length - 1;

    if (
      (ttbEndOfShipCoordinate > this.board.length - 1 && direction === 'ttb') ||
      (ltrEndOfShipCoordinate > this.board[0].length - 1 && direction === 'ltr')
    ) {
      return new Error(
        "The ship of this length can't fit given these coordinates and this direction",
      );
    }

    let coords = [startingCoords[0], startingCoords[1]];

    // Go through each square where the new ship is supposed to be
    for (let i = 0; i < ship.length; i++) {
      if (
        typeof this.board[coords[0]][coords[1]] === 'object' &&
        this.board[coords[0]][coords[1]] !== null
      ) {
        console.log('found collision', coords);
        return new Error("Can't fit a ship here because of another ship");
      }

      if (direction === 'ttb') {
        coords[0]++;
      } else if (direction === 'ltr') {
        coords[1]++;
      }
    }

    // Reset coords after moving through
    coords = [startingCoords[0], startingCoords[1]];

    // Go through each square where the new ship is supposed to be
    for (let i = 0; i < ship.length; i++) {
      console.log('new cell', coords);
      for (let j = coords[0] - 1; j <= coords[0] + 1; j++) {
        for (let k = coords[1] - 1; k <= coords[1] + 1; k++) {
          if (j === coords[0] && k === coords[1]) {
            continue;
          }

          if (
            j > this.board.length - 1 ||
            j < 0 ||
            k > this.board.length - 1 ||
            k < 0
          ) {
            continue;
          }

          if (
            typeof this.board[j][k] === 'object' &&
            this.board[j][k] !== null
          ) {
            console.log('found adjacent ship at', j, k);
            return new Error(
              "Ships can't be immediately adjacent to each other",
            );
          }
        }
      }

      if (direction === 'ttb') {
        coords[0]++;
      } else if (direction === 'ltr') {
        coords[1]++;
      }
    }

    this.shipsInBattle.push(ship);

    // Reset the coords after moving through
    coords = [startingCoords[0], startingCoords[1]];

    // Move again to place the ship after checking for errors
    for (let i = 0; i < ship.length; i++) {
      this.board[coords[0]][coords[1]] = ship;

      if (direction === 'ttb') {
        coords[0]++;
      } else if (direction === 'ltr') {
        coords[1]++;
      }
    }
  };

  gameboard.receiveAttack = function (coords) {
    if (this.hitsBoard[coords[0]][coords[1]] !== null) {
      return new Error('This square has already been hit');
    } else if (
      typeof this.board[coords[0]][coords[1]] === 'object' &&
      this.board[coords[0]][coords[1]] !== null
    ) {
      this.board[coords[0]][coords[1]].hit();
      this.hitsBoard[coords[0]][coords[1]] = 'hit';
    } else if (this.board[coords[0]][coords[1]] === null) {
      this.hitsBoard[coords[0]][coords[1]] = 'missed';
    }
  };

  gameboard.allSunk = function () {
    for (const ship of this.shipsInBattle) {
      if (!ship.isSunk()) {
        return false;
      }
    }

    return true;
  };

  return gameboard;
};

export { BOARD_SIZE };
export default Gameboard;
