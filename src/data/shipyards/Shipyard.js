import Ship from '../Ship';

const Shipyard = (options) => {
  const shipyard = [];

  for (const option of options) {
    for (let i = 0; i < option.count; i++) {
      const shipyardShip = Ship(option.length);
      shipyardShip.direction = 'ltr';
      shipyard.push(shipyardShip);
    }
  }

  shipyard.sort((ship1, ship2) => (ship1.length < ship2.length ? -1 : 1));
  return shipyard;
};

export default Shipyard;
