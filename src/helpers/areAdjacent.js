const areAdjacent = (coords1, coords2) => {
  if (
    Math.abs(coords1[0] - coords2[0]) <= 1 &&
    Math.abs(coords1[1] - coords2[1]) <= 1 &&
    !coordsAreTheSame(coords1, coords2)
  ) {
    return true;
  }

  return false;
};

const coordsAreTheSame = (coords1, coords2) => {
  for (let i = 0; i < coords1.length; i++) {
    if (coords1[i] !== coords2[i]) {
      return false;
    }
  }

  return true;
};

export default areAdjacent;
