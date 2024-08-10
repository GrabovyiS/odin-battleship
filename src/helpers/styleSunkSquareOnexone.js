import getSquareElement from './getSquareElement';

const styleSunkSquareOnexone = (boardContainer, shipSquareCoords) => {
  const squareElement = getSquareElement(boardContainer, shipSquareCoords);
  squareElement.classList.add('sunk-square');

  squareElement.classList.add('sunk-bottom-square');
  squareElement.classList.add('sunk-top-square');
};

export default styleSunkSquareOnexone;
