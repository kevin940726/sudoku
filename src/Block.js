import React from 'react';
import style from './Block.css';

const Block = ({ value }) => (
  <div className={style.block}>
    {value !== 0 && value}
  </div>
);

export default Block;
