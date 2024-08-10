import Ship from '../../data/Ship';
import getLiftedShip from '../../helpers/getLiftedShip';
import getShipStartingCoords from '../../helpers/getShipStartingCoords';
import styleBoardShip from '../../helpers/styleBoardShip';

const ShipyardShip = (ship, direction, player) => {
  const shipContainer = document.createElement('div');
  shipContainer.classList.add('shipyard-ship');

  if (direction === 'ltr') {
    shipContainer.classList.add('ship-ltr');
  } else if (direction === 'ttb') {
    shipContainer.classList.add('ship-ttb');
  }

  for (let i = 0; i < ship.length; i++) {
    const shipSquare = document.createElement('div');
    shipSquare.classList.add('allied-ship');
    shipSquare.classList.add('shipyard-square');

    if (direction === 'ltr') {
      if (i === 0) {
        shipSquare.classList.add('shipyard-left-square');
      } else if (i === ship.length - 1) {
        shipSquare.classList.add('shipyard-right-square');
      } else {
        shipSquare.classList.add('shipyard-ltr-middle-square');
      }
    } else if (direction === 'ttb') {
      if (i === 0) {
        shipSquare.classList.add('shipyard-top-square');
      } else if (i === ship.length - 1) {
        shipSquare.classList.add('shipyard-bottom-square');
      } else {
        shipSquare.classList.add('shipyard-ttb-middle-square');
      }
    }

    shipContainer.appendChild(shipSquare);
  }

  shipContainer.draggable = true;
  shipContainer.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', ship.length);

    if (e.target.closest('.board')) {
      e.target.style.borderLeft = '3px solid black';

      // Lifted up = becomes available
      player.shipyard.push(ship);
      console.log(ship, 'is lifted');
    }

    setTimeout(() => {
      e.target.classList.add('dragging');

      if (e.target.closest('.board')) {
        // remove the lingering 'ship was there' appearance

        e.target
          .closest('.board')
          .querySelectorAll('.dragging')
          .forEach((shipElement) => {
            shipElement.remove();
          });
      }
    }, 1);
  });

  shipContainer.addEventListener('click', (e) => {
    if (!e.target.closest('.board .shipyard-ship')) {
      return;
    }

    const oldDirection = direction;
    const shipStartingCoords = getShipStartingCoords(player.gameboard, ship);
    const newDirection = oldDirection === 'ltr' ? 'ttb' : 'ltr';
    ship.direction = newDirection;

    player.gameboard.deleteShip(ship);

    if (
      !(
        player.gameboard.placeShip(
          ship,
          shipStartingCoords,
          ship.direction,
        ) instanceof Error
      )
    ) {
      const newShipyardShip = ShipyardShip(ship, newDirection, player);
      styleBoardShip(newShipyardShip, shipStartingCoords, newDirection);

      // console.log(newShipyardShip);

      e.target.closest('.board.player-board').appendChild(newShipyardShip);

      e.target.closest('.board .shipyard-ship').remove();
    }

    // remove the ship from the gameboard
    // check if if can fit with a different direction
    // if yes
    // add the same ship with a different direction to the gameboard
    // remove old shipyardship
    // create a new shipyardship and push it
    // if no
    // add the ship back to the gameboard
    // check if its possible to place the old ship with the new direction after deleting it
  });

  return shipContainer;
};

export default ShipyardShip;
