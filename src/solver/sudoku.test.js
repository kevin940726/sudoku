import test from 'ava';
import Sudoku, { replaceAt }  from './sudoku';
import { range } from 'lodash';

test('it should replace string with char in pos', t => {
  const str = '0111';
  const expect = '0101';

  t.is(replaceAt(str, 2, '0'), expect);
});

test('it should create the game object correctly', t => {
  const game = Sudoku();

  t.is(typeof game, 'object');
});

test('game board should be a string with length of 81 consisting only 0 to 9', t => {
  const game = Sudoku();
  const expect = '0'.repeat(81);

  t.is(game.board, expect);
});

test('it should init the game with input board of type string', t => {
  const board = '0'.repeat(81);
  const game = Sudoku().init(board);

  t.is(game.board, board);
});

test('it should init the game with input board of type array of number', t => {
  const board = Array(81).fill(0);
  const game = Sudoku().init(board);

  t.is(game.board, board.join(''));
});

test('it should init the game with input board of type array of char', t => {
  const board = Array(81).fill('0');
  const game = Sudoku().init(board);

  t.is(game.board, board.join(''));
});

test('it should automatically create a new board when no argument specified in the init function', t => {
  const game = Sudoku().init();

  t.is(game.board.length, 81); // has length of 81
  game.board.split('').forEach(block => {
    t.true(+block >= 0 && +block <= 9 && Number.isInteger(+block)); // between 0 to 9 integers
  });
  t.true(game.board.includes('0')); // has at least one '0'
});

test('it should correctly create new board with function new', t => {
  const game = Sudoku().new();

  t.is(game.board.length, 81); // has length of 81
  game.board.split('').forEach(block => {
    t.true(+block >= 0 && +block <= 9 && Number.isInteger(+block)); // between 0 to 9 integers
  });
  t.true(game.board.includes('0')); // has at least on '0'
});

test('the board created should be solvable, and has only 1 answer', t => {
  const game = Sudoku().new().solve();

  t.is(game.answers.length, 1);
  t.truthy(game.answers[0].ans && game.answers[0].count);
});

test('the solver should correctly solve the problem with no blank left', t => {
  const game = Sudoku().new().solve();
  const ans = game.answers[0].ans;

  t.true(Array.isArray(ans)); // is an array
  t.is(ans.length, 81); // has length of 81
  ans.forEach(block => {
    t.true(block > 0 && block <= 9 && Number.isInteger(block)); // between 0 to 9 integers
  });
});

test('the answer should be match to the game rule', t => {
  const game = Sudoku().new().solve();
  const ans = game.answers[0].ans;

  for (let row = 0; row < 9; row++) {
    t.deepEqual(ans.slice(row * 9, row * 9 + 9).sort(), range(1, 10)); // check every rows
  }

  for (let row = 0; row < 9; row++) {
    const arr = [];
    for (let col = 0; col < 9; col++) {
      arr.push(ans[row + col * 9]);
    }
    t.deepEqual(arr.sort(), range(1, 10)); // check evert columns
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const arr = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          arr.push(ans[(row * 3 * 9 + col * 3) + (r * 9 + c)])
        }
      }
      t.deepEqual(arr.sort(), range(1, 10)); // check every grids
    }
  }
});

test('it should correctly insert number to board', t => {
  const board = '0'.repeat(81);
  const game = Sudoku().init(board);
  const expect = '1' + '0'.repeat(80);

  t.is(game.insert(0, 1).board, expect);
});

test('it should correctly insert note to board', t => {
  const notes = Sudoku().init().insertNote(0, 1).notes;

  t.deepEqual(notes, [{ 1: true}, ...new Array(80).fill({})]);
});

test('it should correctly clear all notes at position', t => {
  const notes = [{ 1: true}, ...new Array(80).fill({})];
  const game = Sudoku().init(null, notes);

  t.deepEqual(game.notes, notes);
  t.deepEqual(game.clearNotes(0).notes, new Array(81).fill({}));
});

test('isProblem should correctly return the boolean value', t => {
  const board = '1' + '0'.repeat(80);
  const game = Sudoku().init(board);

  t.true(game.isProblem(0));
  t.false(game.isProblem(1));
});

test('findCandidates should correctly return the candidates array', t => {
  let board = '0'.repeat(81);
  const { findCandidates } = Sudoku();

  for (let i = 0; i < 8; i++) {
    board = replaceAt(board, i, (i + 1).toString());
    board = replaceAt(board, i * 9, (i + 1).toString());
  }
  t.deepEqual(findCandidates(board, 8), [9]); // check row
  t.deepEqual(findCandidates(board, 72), [9]); // check column

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      board = replaceAt(board, r * 9 + c, (r * 3 + c + 1).toString());
    }
  }
  board = replaceAt(board, 20, '0');
  t.deepEqual(findCandidates(board, 20), [9]); // check grid
});

test('it should successfully initialize the timer', t => {
  const game = Sudoku().init();

  t.truthy(game._timer);
});

test('it should successfully pause the timer', t => {
  const game = Sudoku().init().pauseTimer();

  t.falsy(game._timer);
});

test('it should successfully restart the timer', t => {
  const game = Sudoku().init().pauseTimer().startTimer();

  t.truthy(game._timer);
});
