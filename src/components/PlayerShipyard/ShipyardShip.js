const ShipyardShip = (length, direction, player) => {
  const shipContainer = document.createElement('div');
  shipContainer.classList.add('shipyard-ship');

  if (direction === 'ltr') {
    shipContainer.classList.add('ship-ltr');
  } else if (direction === 'ttb') {
    shipContainer.classList.add('ship-ttb');
  }

  for (let i = 0; i < length; i++) {
    const shipSquare = document.createElement('div');
    shipSquare.classList.add('allied-ship');
    shipSquare.classList.add('shipyard-square');

    if (direction === 'ltr') {
      if (i === 0) {
        shipSquare.classList.add('shipyard-left-square');
      } else if (i === length - 1) {
        shipSquare.classList.add('shipyard-right-square');
      } else {
        shipSquare.classList.add('shipyard-ltr-middle-square');
      }
    } else if (direction === 'ttb') {
      if (i === 0) {
        shipSquare.classList.add('shipyard-top-square');
      } else if (i === length - 1) {
        shipSquare.classList.add('shipyard-bottom-square');
      } else {
        shipSquare.classList.add('shipyard-ttb-middle-square');
      }
    }

    const shipTakenFromShipyard = new Event('shipTakenFromShipyard');

    shipContainer.draggable = true;
    shipContainer.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', length);

      console.log('dragstart');

      setTimeout(() => {
        e.target.classList.add('dragging');
      }, 1);

      // const takenShipIndex = player.shipyard.find(
      //   (ship) => ship.length === length,
      // );
      // player.shipyard.splice(takenShipIndex, 1);
    });

    shipContainer.appendChild(shipSquare);
  }

  return shipContainer;
};

export default ShipyardShip;
