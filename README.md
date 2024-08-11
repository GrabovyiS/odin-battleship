# Odin Battleship

## Notable features

1. Drag and drop ships onto the board
2. Computer player that makes intelligent moves after hits
3. Random placement of ships of computer player
4. Randomizing placement of draggable ships

## Notable implementation details

1. Using HTML drag and drop API (which is not great btw)
2. Using recursive async function to allow computer player make multiple turns in a row after a hit

## Development and structure details

This project uses vanilla javascript with webpack as module bundler. Data-related files and components are factory functions. Files are split into three main folders data-related functions, component factories and helper functions. Most of functionality of data-related functions and helper functions is unit tested via Jest. The distribution code can be found on the `gh-pages` branch with the github pages live version of the app deployed from it.
