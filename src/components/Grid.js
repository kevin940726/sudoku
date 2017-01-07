import React from 'react';
import style from './Board.css';
import { range } from 'lodash';
import Block from '../containers/Block';

const Grid = ({ isGray, gridRow, gridCol, board }) => (
  <div className={isGray ? style.gridGray : style.grid}>
    {range(0, 3).map(row => (
      <div key={row} className={style.row}>
        {range(0, 3).map(col => (
          <Block
            key={col}
            pos={(gridRow * 3 + row) * 9 + (gridCol * 3 + col)}
          />
        ))}
      </div>
    ))}
  </div>
)

export default Grid;
