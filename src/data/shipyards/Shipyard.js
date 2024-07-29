import Ship from '../Ship';

const Shipyard = (options) => {
  const shipyard = [];

  for (const option of options) {
    for (let i = 0; i < option.count; i++) {
      shipyard.push(Ship(option.length));
    }
  }

  shipyard.sort((ship1, ship2) => (ship1.length < ship2.length ? -1 : 1));
  return shipyard;
};

export default Shipyard;
