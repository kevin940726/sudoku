import React from 'react';
import onClickOutside from 'react-onclickoutside';
import styles from './NumPad.css';
import { range } from 'lodash';

const NumPad = ({ handleClickOutside, handleClick }) => (
  <div className={styles.numPad}>
    {range(1, 10).map(num => (
      <span
        className={styles.num}
        key={num}
        onClick={() => handleClick(num)}
      >
        {num}
      </span>
    ))}
  </div>
);

export default onClickOutside(NumPad);
