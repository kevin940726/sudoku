import React from 'react';
import onClickOutside from 'react-onclickoutside';
import styles from './NumPad.css';
import { range } from 'lodash';

const NumPad = ({ handleClickOutside, handleClick }) => (
  <div>
    <div className={styles.numPad}>
      {range(0, 10).map(num => (
        <span
          className={styles.num}
          key={num}
          onClick={() => handleClick(num)}
        >
          {num}
        </span>
      ))}
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>
  </div>
);

export default onClickOutside(NumPad);
