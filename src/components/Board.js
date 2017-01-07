import React from 'react';
import style from './Board.css';
import { range } from 'lodash';
import Grid from '../components/Grid';

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
