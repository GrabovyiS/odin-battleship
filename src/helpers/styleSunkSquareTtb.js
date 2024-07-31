import getSquareElement from './getSquareElement';

const styleSunkSquareTtb = (boardContainer, shipSquareCoords, shipPosition) => {
  const squareElement = getSquareElement(boardContainer, shipSquareCoords);
  if (shipPosition === 'first') {
    squareElement.classList.add('sunk-top-square');
  }
  if (shipPosition === 'last') {
    squareElement.classList.add('sunk-bottom-square');
  }
  squareElement.classList.add('sunk-ttb-middle-square');
};

export default styleSunkSquareTtb;
