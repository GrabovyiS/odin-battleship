const areCrossAdjacent = (coords1, coords2) => {
  if (coords1[0] < 0 || coords1[1] < 0 || coords2[0] < 0 || coords2[1] < 0) {
    return new Error('Coords out of bounds');
  }

  if (
    (coords1[0] === coords2[0] + 1 && coords1[1] === coords2[1]) ||
    (coords1[0] === coords2[0] - 1 && coords1[1] === coords2[1]) ||
    (coords1[1] === coords2[1] + 1 && coords1[0] === coords2[0]) ||
    (coords1[1] === coords2[1] - 1 && coords1[0] === coords2[0])
  ) {
    return true;
  }

  return false;
};

export default areCrossAdjacent;
