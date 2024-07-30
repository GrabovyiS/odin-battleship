const getChangedSquareCoords = (oldBoard, newBoard) => {
  for (let i = 0; i < newBoard.length; i++) {
    for (let j = 0; j < newBoard.length; j++) {
      const oldSquare = oldBoard[i][j];
      const newSquare = newBoard[i][j];
      if (oldSquare !== newSquare) {
        return [i, j];
      }
    }
  }

  return null;
};

export default getChangedSquareCoords;
