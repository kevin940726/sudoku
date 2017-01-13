/* @flow */
import { range, shuffle, random, fill, chunk } from 'lodash';
import kudoku from './kudoku';
import EventEmitter from 'eventemitter3';
import type { BoardInput, Answers, SudokuObjectLiteral, Notes } from './sudoku.flow';

export const replaceAt = (str: string, index: number, char: string): string => (
  str.substr(0, index) + char + str.substr(index + 1)
);

const Sudoku = (): SudokuObjectLiteral => {
  const solver = kudoku();

  return {
    board: '0'.repeat(81),
    _solver: solver,
    _problem: '',
    answers: [],
    notes: [],
    isSolved: false,
    _timer: 0,
    time: 0,
    _emitter: new EventEmitter(),

    init: function(board: BoardInput, notes: Notes = fill(new Array(81), {})) {
      if (typeof board === 'string') {
        this.board = board;
      } else if (Array.isArray(board)) {
        this.board = board.join('');
      } else if (board === null || typeof board === 'undefined') {
        const game = this.new();
        game.notes = notes.slice();
        return game;
      } else {
        throw new Error('Type of board should be string or array!');
      }

      this._problem = this.board;
      this.notes = notes.slice();
      this.isSolved = false;
      this.time = 0;
      this._emitter.emit('timeOnUpdate', this.time);
      this.pauseTimer().startTimer();
      return this;
    },

    new: function(difficulty: ?number) {
      let board: string = '0'.repeat(81);
      const blanks: Array<number> = range(0, 81);
      let r: number;
      let pos: number;
      let ans: Answers = [];
      let rList: Array<number>;

      while (blanks.length) {
        r = random(blanks.length - 1);
        pos = blanks[r];
        rList = shuffle(this.findCandidates(board, pos));
        for (let i = 0; i < rList.length; i++) {
          board = replaceAt(board, pos, rList[i].toString());
          ans = this._solver(board, 2);
          if (ans.length) {
            break;
          }
        }
        if (ans.length === 1) {
          board = ans[0].ans.join('');
          break;
        }
        blanks.splice(r, 1);
      }

      this.answers = ans.slice();
      if (process.env.NODE_ENV === 'development') {
        console.log(this.prettyPrint(this.answers[0].ans));
      }
      return this.dig(board);
    },

    dig: function(board: string) {
      const holes: Array<number> = shuffle(range(0, 81));
      let ans: Answers;
      let tmp: string;

      for (let i = 0; i < holes.length; i++) {
        tmp = board[holes[i]];
        board = replaceAt(board, holes[i], '0');
        ans = this._solver(board, 2);
        if (ans.length === 2) {
          board = replaceAt(board, holes[i], tmp);
        }
      }

      return this.init(board);
    },

    findCandidates: function(board: string, pos: number): Array<number> {
      let candidates: Array<number> = range(0, 10);

      const cs: number = pos % 9;
      const rs: number = pos - cs;
      const gs: number = (rs - rs % 27) + (cs - cs % 3);

      for (let r = rs, c = cs; r < rs + 9; r++, c += 9) {
        candidates[+board[r]] = 0;
        candidates[+board[c]] = 0;
      }
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[gs + r * 9 + c]) {
            candidates[+board[gs + r * 9 + c]] = 0;
          }
        }
      }

      return candidates.filter(c => c !== 0);
    },

    solve: function(ansLimit: number = 1) {
      this.answers = this._solver(this.board, ansLimit);
      return this;
    },

    isProblem: function(pos: number): boolean {
      return this._problem[pos] !== '0';
    },

    insert: function(pos: number, num: number) {
      if (!this.isProblem(pos)) {
        this.board = replaceAt(this.board, pos, num.toString());
      }

      if (this.answers.length && this.board === this.answers[0].ans.join('')) {
        return this.solved();
      }

      return this;
    },

    insertNote: function(pos: number, note: number) {
      if (note > 0 && note <= 9) {
        this.notes[pos] = {
          ...this.notes[pos],
          [note]: !this.notes[pos][note],
        };
      }

      return this;
    },

    clearNotes: function(pos: number) {
      this.notes[pos] = {};

      return this;
    },

    solved: function() {
      this.isSolved = true;
      clearInterval(this._timer);

      return this;
    },

    pauseTimer: function() {
      clearInterval(this._timer);
      this._timer = 0;

      return this;
    },

    startTimer: function() {
      if (!this._timer) {
        this._timer = setInterval(() => {
          this.time += 1;
          this._emitter.emit('timeOnUpdate', this.time);
        }, 1000);
      }

      return this;
    },

    toggleTimer: function() {
      if (this._timer) {
        return this.pauseTimer();
      } else {
        return this.startTimer();
      }
    },

    /* what happens here is not important at all,
     * just for debugging.
     */
    prettyPrint: function(board: string | Array<number>) {
      const arr: Array<string> | Array<number> = typeof board === 'string' ? board.split('') : board;

      return chunk(
        chunk(arr, 9).map(row =>
          chunk(row, 3).map(grid => grid.join(' ')).join(' | ')
        )
      , 3)
        .map(grid =>
          grid.join('\n')
        )
        .join('\n' + ['-'.repeat(6), '-'.repeat(7), '-'.repeat(6)].join('+') + '\n')
    },
  };
};

export default Sudoku;
