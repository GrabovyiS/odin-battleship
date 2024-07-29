const areAdjacent = (coords1, coords2) => {
  if (
    Math.abs(coords1[0] - coords2[0]) <= 1 &&
    Math.abs(coords1[1] - coords2[1]) <= 1 &&
    coords1[0] !== coords2[0] &&
    coords1[1] !== coords2[1]
  ) {
    return true;
  }

  return false;
};

export default areAdjacent;
