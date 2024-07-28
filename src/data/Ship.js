const Ship = (length) => {
  const ship = {};

  ship.length = length;
  ship.hits = 0;

  // I like writing factories in this way.
  // Very clear weather or not the function is returned in the resulting object.
  // Also not messing with prototypes and Object.create which might be less performant but more readable
  ship.hit = function () {
    this.hits++;
  };

  ship.isSunk = function () {
    if (this.hits < this.length) {
      return false;
    }

    return true;
  };

  return ship;
};

export default Ship;
