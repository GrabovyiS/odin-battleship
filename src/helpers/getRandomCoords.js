import BOARD_SIZE from '../data/BOARD_SIZE';

const getRandomInt = (max) => {
  // Gets from [0, max)
  return Math.floor(Math.random() * max);
};

const getRandomCoords = () => {
  const coords = [getRandomInt(BOARD_SIZE), getRandomInt(BOARD_SIZE)];
  return coords;
};

export default getRandomCoords;
