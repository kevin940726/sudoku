import { range, shuffle, random, fill } from 'lodash';
import kudoku from './kudoku';

const replaceAt = (str, index, char) => (
  str.substr(0, index) + char + str.substr(index + 1)
);

const Sudoku = () => {
  const solver = kudoku();

  return {
    board: '0'.repeat(81),
    _solver: solver,
    _problem: '',
    answers: [],
    notes: [],
    isSolved: false,
    _timer: null,
    time: 0,

    init: function(board) {
      if (typeof board === 'string') {
        this.board = board;
      } else if (Array.isArray(board)) {
        this.board = board.join('');
      } else {
        throw new Error('Type of board should be string or array!');
      }

      this._problem = this.board;
      this.notes = fill(Array(81), {});
      this.isSolved = false;
      this.time = 0;
      clearInterval(this._timer);
      this._timer = setInterval(() => {
        this.time += 1;
      }, 1000);
      return this;
    },

    new: function(difficulty) {
      let board = '0'.repeat(81);
      const blanks = range(0, 81);
      let r, pos, ans, rList;

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
      return this.dig(board);
    },

    dig: function(board) {
      const holes = shuffle(range(0, 81));
      let ans, tmp;

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

    findCandidates: function(board, pos) {
      let candidates = range(0, 10);

      const cs = pos % 9;
      const rs = pos - cs;
      const gs = (rs - rs % 27) + (cs - cs % 3);

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

    solve: function(ansLimit = 1) {
      this.answers = this._solver(this.board, ansLimit);
      return this;
    },

    isProblem: function(pos) {
      return this._problem[pos] !== '0';
    },

    insert: function(pos, num) {
      if (!this.isProblem(pos) && (this.findCandidates(this.board, pos).includes(num) || num === 0)) {
        this.board = replaceAt(this.board, pos, num);
      }

      if (this.board === this.answers[0].ans.join('')) {
        return this.solved();
      }

      return this;
    },

    insertNote: function(pos, note) {
      this.notes[pos] = {
        ...this.notes[pos],
        [note]: !this.notes[pos][note],
      };

      return this;
    },

    clearNotes: function(pos) {
      this.notes[pos] = {};

      return this;
    },

    solved: function() {
      this.isSolved = true;
      clearInterval(this._timer);

      return this;
    },

    prettyPrint: function(board) {
      console.log(board.match(/.{1,9}/g).map(row => row.split('').map(c => c === '0' ? '_' : c).join(' ')).join('\n'), '\n');
    },
  };
};

export default Sudoku;
