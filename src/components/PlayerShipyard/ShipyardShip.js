const ShipyardShip = (length, direction) => {
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

    shipContainer.draggable = true;
    shipContainer.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData(length);
    });

    shipContainer.appendChild(shipSquare);
  }

  return shipContainer;
};

export default ShipyardShip;
