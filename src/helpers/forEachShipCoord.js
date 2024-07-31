import getShipCoords from './getShipCoords';

const forEachShipCoord = (
  gameboard,
  ship,
  ltrCallback,
  ttbCallback,
  onexoneCallback,
) => {
  const shipCoords = getShipCoords(gameboard, ship);

  if (shipCoords.length === 1) {
    let shipCoord = shipCoords[0];
    // 1x1 ship
    onexoneCallback(shipCoord);
  } else {
    if (shipCoords[0][0] - shipCoords[1][0] === 0) {
      // x is the same, direction is ltr
      shipCoords.sort((coords1, coords2) => (coords1[1] < coords2[1] ? -1 : 1));

      for (let i = 0; i < shipCoords.length; i++) {
        let shipCoord = shipCoords[i];
        if (i === 0) {
          ltrCallback(shipCoord, 'first');
        } else if (i === shipCoords.length - 1) {
          ltrCallback(shipCoord, 'last');
        } else {
          ltrCallback(shipCoord, i);
        }
      }
    } else if (shipCoords[0][1] - shipCoords[1][1] === 0) {
      // y is the same, direction is ttb
      shipCoords.sort((coords1, coords2) => (coords1[0] < coords2[0] ? -1 : 1));

      for (let i = 0; i < shipCoords.length; i++) {
        let shipCoord = shipCoords[i];
        ttbCallback(shipCoord, i);
      }
    }
  }
};

export default forEachShipCoord;
