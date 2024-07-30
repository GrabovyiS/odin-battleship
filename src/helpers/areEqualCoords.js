const areEqualCoords = (coords1, coords2) => {
  if (!coords1 || !coords2) {
    return new Error('Must provide two coordinates');
  }

  if (!Array.isArray(coords1) || !Array.isArray(coords2)) {
    return new Error('Must provide coordinates as arrays');
  }

  if (coords1.length !== 2 || coords2.length !== 2) {
    return new Error('Must provide coordinates as arrays of two elements');
  }

  if (coords1[0] === coords2[0] && coords1[1] === coords2[1]) {
    return true;
  }

  return false;
};

export default areEqualCoords;
