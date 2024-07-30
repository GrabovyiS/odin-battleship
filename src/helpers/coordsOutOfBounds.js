const coordsOutOfBounds = (arr, coords) => {
  if (!arr) {
    return new Error(
      'Must provide a two dimensional array to check for bounds',
    );
  }

  if (!Array.isArray(coords)) {
    return new Error('Must provide an array of coordinates');
  }

  if (coords.length !== 2) {
    return new Error(
      'Must provide an array consisting of two integer coordinates',
    );
  }

  if (!Array.isArray(arr)) {
    return new Error(
      'Must provide a two dimensional array to check for bounds',
    );
  }

  if (!Array.isArray(arr[0])) {
    return new Error(
      'Must provide a two dimensional array to check for bounds',
    );
  }

  if (
    coords[0] > arr.length - 1 ||
    coords[0] < 0 ||
    coords[1] > arr.length - 1 ||
    coords[1] < 0
  ) {
    return true;
  }

  return false;
};

export default coordsOutOfBounds;
