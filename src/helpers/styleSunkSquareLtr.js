import getSquareElement from './getSquareElement';

const styleSunkSquareLtr = (boardContainer, shipSquareCoords, shipPosition) => {
  const squareElement = getSquareElement(boardContainer, shipSquareCoords);
  squareElement.classList.add('sunk-square');

  if (shipPosition === 'first') {
    squareElement.classList.add('sunk-left-square');
  }
  if (shipPosition === 'last') {
    squareElement.classList.add('sunk-right-square');
  }
  squareElement.classList.add('sunk-ltr-middle-square');
};

export default styleSunkSquareLtr;
