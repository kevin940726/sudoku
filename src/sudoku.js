import { range, shuffle, random } from 'lodash';
import kudoku from './solver/kudoku';

const Sudoku = () => {
  const solver = kudoku();

  return {
    board: '0'.repeat(81),
    _solver: solver,
    answers: [],

    init: function(board) {
      if (typeof board === 'string') {
        this.board = board;
      } else if (Array.isArray(board)) {
        this.board = board.map(row => row.join('')).join('');
      } else {
        throw new Error('Type of board should be string or array!');
      }

      return this;
    },

    new: function(difficulty) {
      let board = '0'.repeat(81).split('');
      const blanks = range(0, 81);
      let r, pos, ans, rList;

      while (blanks.length) {
        r = random(blanks.length - 1);
        pos = blanks[r];
        rList = shuffle(this.findCandidates(board, pos));
        for (let i = 0; i < rList.length; i++) {
          board[pos] = rList[i];
          ans = this._solver(board.join(''), 2);
          if (ans.length) {
            break;
          }
        }
        if (ans.length === 1) {
          board = ans[0];
          break;
        }
        blanks.splice(r, 1);
      }

      this.answers = [board];
      return this.dig(board);
    },

    dig: function(board) {
      const holes = shuffle(range(0, 81));
      let ans, tmp;

      for (let i = 0; i < holes.length; i++) {
        tmp = board[holes[i]];
        board[holes[i]] = 0;
        ans = this._solver(board.join(''), 2);
        if (ans.length === 2) {
          board[holes[i]] = tmp;
          continue;
        }
      }

      this.board = board.join('');
      return this;
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
    },

    prettyPrint: function(board) {
      console.log(board.match(/.{1,9}/g).map(row => row.split('').map(c => c === '0' ? '_' : c).join(' ')).join('\n'), '\n');
    },
  };
};

export default Sudoku;
