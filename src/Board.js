import React from 'react';
import style from './Board.css';
import { range } from 'lodash';
import Block from './Block';

import Sudoku from './sudoku';
const game = Sudoku().new();

const Grid = ({ isGray, gridRow, gridCol }) => (
  <div className={isGray ? style.gridGray : style.grid}>
    {range(0, 3).map(row => (
      <div key={row} className={style.row}>
        {range(0, 3).map(col => (
          <Block
            key={col}
            value={+game.board[(gridRow * 3 + row) * 9 + (gridCol * 3 + col)]}
          />
        ))}
      </div>
    ))}
  </div>
)

const Board = () => (
  <div className={style.board}>
    {range(0, 3).map(gridRow => (
      <div key={gridRow} className={style.row}>
        {range(0, 3).map(gridCol => (
          <Grid
            key={gridCol}
            isGray={(gridRow * 3 + gridCol) % 2 !== 0}
            gridRow={gridRow}
            gridCol={gridCol}
          />
        ))}
      </div>
    ))}
  </div>
);

export default Board;
