import Sudoku from '../sudoku';

const game = Sudoku();

for (let i = 0; i < 1; i++) {
  const newGame = game.new();
  const start = Date.now();
  const count = newGame.solve().answers[0].count;
  console.log(Date.now() - start, count);
}
