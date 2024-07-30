import coordsOutOfBoardBounds from './coordsOutOfBoardBounds';

const getNewPossibleHitCoordsAfterMultipleHits = (hitCoords) => {
  if (!Array.isArray(hitCoords)) {
    return new Error('Must provide an array of coords of previous hits');
  }

  if (!Array.isArray(hitCoords[0])) {
    return new Error('Must provide an array of coords arrays of previous hits');
  }

  if (hitCoords.length < 2) {
    return new Error(
      'Must provide an array of at least two coords of previous hits',
    );
  }

  const newPossibleHitCoords = [];

  if (hitCoords[0][0] - hitCoords[1][0] === 0) {
    // direction is X
    // figure out the most left and most right hit
    hitCoords.sort((coords1, coords2) => (coords1[0] < coords2[0] ? -1 : 1));
    const mostLeft = hitCoords[0];
    const mostRight = hitCoords[hitCoords.length - 1];

    const lefter = [mostLeft[0], mostLeft[1] - 1];
    const righter = [mostLeft[0], mostRight[1] + 1];

    if (!coordsOutOfBoardBounds(lefter)) {
      newPossibleHitCoords.push(lefter);
    }

    if (!coordsOutOfBoardBounds(righter)) {
      newPossibleHitCoords.push(righter);
    }
  } else if (hitCoords[0][1] - hitCoords[1][1] === 0) {
    // direction is y
    hitCoords.sort((coords1, coords2) => (coords1[1] < coords2[1] ? -1 : 1));
    const mostTop = hitCoords[0];
    const mostBottom = hitCoords[hitCoords.length - 1];

    const topper = [mostTop[0] - 1, mostTop[1]];
    const bottomer = [mostBottom[0] + 1, mostBottom[1]];

    if (!coordsOutOfBoardBounds(topper)) {
      newPossibleHitCoords.push(topper);
    }

    if (!coordsOutOfBoardBounds(bottomer)) {
      newPossibleHitCoords.push(bottomer);
    }
  }

  return newPossibleHitCoords;
};

export default getNewPossibleHitCoordsAfterMultipleHits;
