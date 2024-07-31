import areEqualCoords from './areEqualCoords';

const getSquareElement = (gameboardContainer, coords) => {
  for (const child of gameboardContainer.childNodes) {
    if (areEqualCoords(child.coords, coords)) {
      return child;
    }
  }
};

export default getSquareElement;
