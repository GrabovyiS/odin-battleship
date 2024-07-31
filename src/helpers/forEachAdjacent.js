import BOARD_SIZE from '../data/BOARD_SIZE';

const forEachAdjacent = (array, coords, callback) => {
  for (let i = coords[0] - 1; i <= coords[0] + 1; i++) {
    for (let j = coords[1] - 1; j <= coords[1] + 1; j++) {
      if (i === coords[0] && j === coords[1]) {
        continue;
      }

      if (i > BOARD_SIZE - 1 || i < 0 || j > BOARD_SIZE - 1 || j < 0) {
        continue;
      }

      callback(array[i][j]);
    }
  }
};

export default forEachAdjacent;
