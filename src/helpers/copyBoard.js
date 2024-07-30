const copyBoard = (board) => {
  if (!Array.isArray(board)) {
    return false;
  }

  if (board.length === 0) {
    return false;
  }

  if (!Array.isArray(board[0])) {
    return false;
  }

  if (board[0].length === 0) {
    return false;
  }

  const copy = [];
  for (let i = 0; i < board.length; i++) {
    copy.push(board[i].slice());
  }

  return copy;
};

export default copyBoard;
