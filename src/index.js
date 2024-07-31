import './assets/styles/reset.css';
import './assets//styles/normalize.css';
import './assets//styles/styles.css';
import './assets/images/placeholder.png';

import startPlayerVsComputer from './startPlayerVsComputer';

startPlayerVsComputer();

const playerVsComputerButton = document.querySelector('#player-vs-computer');
playerVsComputerButton.addEventListener('click', startPlayerVsComputer);
