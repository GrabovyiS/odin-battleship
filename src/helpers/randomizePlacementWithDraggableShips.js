import getRandomCoords from './getRandomCoords';

const randomizePlacementWithDraggableShips = (player) => {
  const shipyardElement = document.querySelector('.shipyard');
  const shipyardElementChildren = Array.from(shipyardElement.childNodes);
  const reversedShipyardElementChildren = shipyardElementChildren.toReversed();

  for (const shipContainer of reversedShipyardElementChildren) {
    const dataTransfer = new DataTransfer();
    const dragStartEvent = new DragEvent('dragstart', { dataTransfer });
    shipContainer.dispatchEvent(dragStartEvent);

    const currentShipLength = Number(dataTransfer.getData('text/plain'));
    const currentShip = player.shipyard.find(
      (ship) => ship.length === currentShipLength,
    );

    while (true) {
      currentShip.direction =
        Math.floor(Math.random() * 2) === 1 ? 'ltr' : 'ttb';
      let randomCoords = getRandomCoords();

      if (
        !(
          player.gameboard.placeShip(
            currentShip,
            randomCoords,
            currentShip.direction,
          ) instanceof Error
        )
      ) {
        player.gameboard.deleteShip(currentShip);

        const chosenSquare = document.querySelector(
          `.player-board .i_${randomCoords[0]}_j_${randomCoords[1]}`,
        );
        const dropEvent = new DragEvent('drop', { dataTransfer });
        chosenSquare.dispatchEvent(dropEvent);
        break;
      }
    }
  }
};

export default randomizePlacementWithDraggableShips;
