import React from 'react';
import style from './ControlBar.css';

const ControlBar = ({ newGame }) => (
  <div className={style.controlBar}>
    <button className={style.newGameBtn} onClick={newGame}>
      <span style={{ marginLeft: '-3px' }}>⭐</span>
    </button>
  </div>
);

export default ControlBar;
