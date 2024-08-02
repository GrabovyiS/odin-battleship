const styleBoardShip = (shipELement, coords, direction) => {
  if (direction === 'ltr') {
    shipELement.classList.remove('ship-ttb');
    shipELement.classList.add('ship-ltr');
  } else if (direction === 'ttb') {
    shipELement.classList.remove('ship-ltr');
    shipELement.classList.add('ship-ttb');
  }

  shipELement.style.left = `${coords[1] * 50}px`;
  shipELement.style.top = `${coords[0] * 50}px`;
};

export default styleBoardShip;
