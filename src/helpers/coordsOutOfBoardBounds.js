import BOARD_SIZE from '../data/BOARD_SIZE';

const coordsOutOfBoardBounds = (coords) => {
  if (!Array.isArray(coords)) {
    return new Error('Must provide an array of coordinates');
  }

  if (coords.length !== 2) {
    return new Error(
      'Must provide an array consisting of two integer coordinates',
    );
  }

  if (
    coords[0] > BOARD_SIZE - 1 ||
    coords[0] < 0 ||
    coords[1] > BOARD_SIZE - 1 ||
    coords[1] < 0
  ) {
    return true;
  }

  return false;
};

export default coordsOutOfBoardBounds;
